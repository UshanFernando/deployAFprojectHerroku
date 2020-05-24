
const express=require('express');
const router=express.Router();
const Register = require('../schema/Register');
const auth = require("../Authentication/Auth");


router.post("/reset", function (req, res, next) {

    Register.findOne({ _id: req.body.id }).then(function (item) {
      res.send(item);
    });
  });

  router.put("/register", auth, function (req, res, next) {
    const { id } = req.user;
  
    Register.findByIdAndUpdate(
      { _id:id },
      {
        fname: req.body.fname,
        lname: req.body.lname
      }
    ).then(function () {
        Register.findOne({ _id: req.body.id }).then(function (single) {
        res.send(single);
      });
    });
  });




module.exports = router;