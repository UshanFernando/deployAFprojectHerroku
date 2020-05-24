const express = require("express");
const router = express.Router();
const Category = require("../schema/Category");
const Register = require("../schema/Register");
const Product = require("../schema/StoreManagerProducts");
const auth = require("../Authentication/Auth");

require("dotenv").config();

const mailAccountUser = process.env.MAIL_USER_NAME;
const mailAccountPassword = process.env.MAIL_PASSWORD;

const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transport = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    auth: {
      user: mailAccountUser,
      pass: mailAccountPassword,
    },
  })
);

router.post("/storemanager", auth, async function (req, res, next) {
  const { role } = req.user;

  if (role !== "admin") {
    return res.sendStatus(403);
  }
  const validEmail = await Register.findOne({ email: req.body.email });
  if (validEmail) {
    return res.json({
      error: "This Email is already registered in the system",
    });
  }
  let passGenaretd = genPassword();
  Register.create({
    utype: "sm",
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: passGenaretd,
  })
    .then(function (item) {
      res.json({ ok: "User Registered as a Store Manager Succefully!" });

      let mail = {
        from: mailAccountUser,
        to: req.body.email,
        subject: "You have been promoted as store manager",
        text: "Use This username and password to log into site",
        html:
          "<h2>Welcome to Fashion Store!<h2/><h3>Use This username and password to log into site<h3/> <br/> <b>Email : " +
          req.body.email +
          "</b> <br/> <b> Password : " +
          passGenaretd,
      };
      transport.sendMail(mail, function (error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log("Message sent: " + response.message);
        }
      });

      transport.close();
    })
    .catch(next);
});

router.get("/storemanager", auth, function (req, res, next) {
  const { role } = req.user;
  if (role !== "admin") {
    return res.sendStatus(403);
  }
  Register.find({ utype: "sm" }).then(function (item) {
    res.send(item);
  });
});

router.delete("/storemanager", auth, function (req, res, next) {
  const { role } = req.user;
  if (role !== "admin") {
    return res.sendStatus(403);
  }
  Register.findByIdAndRemove({ _id: req.body.id }).then(function (item) {
    res.send(item);
  });
});

router.post("/category", auth, function (req, res, next) {
  const { role } = req.user;

  if (role !== "admin") {
    return res.sendStatus(403);
  }
  Category.create({
    name: req.body.name,
  })
    .then(function (item) {
      res.send(item);
    })
    .catch(next);
});

router.get("/category", function (req, res, next) {
  Category.find({}).then(function (item) {
    res.send(item);
  });
});

router.put("/category", auth, function (req, res, next) {
  const { role } = req.user;

  if (role !== "admin") {
    return res.sendStatus(403);
  }
  Category.findByIdAndUpdate(
    { _id: req.body.id },
    {
      name: req.body.name,
    }
  ).then(function () {
    Category.findOne({ _id: req.body.id }).then(function (single) {
      res.send(single);
    });
  });
});

router.delete("/category", auth, function (req, res, next) {
  const { role } = req.user;

  if (role !== "admin") {
    return res.sendStatus(403);
  }

  Category.findByIdAndRemove({ _id: req.body.id }).then(function (item) {
    res.send(item);
  });
});

router.get("/stats", auth, async function (req, res, next) {
  const { role } = req.user;

  if (role !== "admin") {
    return res.sendStatus(403);
  }
  let cateCount = -1;
  let userCount = -1;
  cateCount = await Category.find({}).then(function (item) {
    return item.length;
  });
  userCount = await Register.find({}).then(function (item) {
    return item.length;
  });

  productCount = await Product.find({}).then(function (item) {
    return item.length;
  });

  storemanagerCount = await Register.find({ utype: "sm" }).then(function (
    item
  ) {
    return item.length;
  });

  res.json({
    categories: cateCount,
    users: userCount,
    products: productCount,
    storemanagers: storemanagerCount,
  });
});

function genPassword() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = router;
