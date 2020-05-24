const express = require("express");
const router = express.Router();
const Register = require("../schema/Register");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
require("dotenv").config();

const accessTokenSecret = process.env.TOKEN_SECRET;

router.post("/login", async function (req, res) {
  const user = await Register.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { id: user._id, role: user.utype },
      accessTokenSecret
    );


    res.json({
      accessToken,
    
    });
  } else {
    res.json({ error: "Username or password incorrect" });
  }
});

module.exports = router;
