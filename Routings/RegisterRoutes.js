const express=require('express');
const auth = require("../Authentication/Auth");
const router=express.Router();

const Register = require('../schema/Register');

router.post('/register', function (req, res, next) {
    Register.create({
      
      utype:req.body.utype,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
    }
     ).then(function(item){
      res.send(item);
    }).catch(next);
 
});

router.get('/register',function(req,res,next){
    Register.find({}).then(function(item){
      res.send(item);
    });
});
router.delete("/register/:Cid",auth, function (req, res, next) {
  const customerId=req.params.Cid;
  Register.findByIdAndRemove({ _id: customerId}).then(function (item) {
    res.send(item);
  });
});
  

module.exports=router;