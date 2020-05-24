const express=require('express');
const router=express.Router();
const Comment = require('../schema/Comment');
const auth = require("../Authentication/Auth");

router.post('/newComment',auth, function (req, res, next) {
  Comment.create({
      
      name: req.body.name,
      message: req.body.message,
      rating: req.body.rating,
      product:req.body.product,
    //user: {type: mongoose.Types.ObjectId, required: true, ref: 'User' },
      user: req.body.user
    }
     ).then(function(item){
      res.send(item);
    }).catch(next);
 
});

router.get('/comments',function(req,res,next){
  Comment.find({}).then(function(item){
      res.send(item);
    });
});

router.get('/comments/:id',function(req,res,next){
  const userId=req.params.id;
  Comment.find({_id:userId}).then(function(item){
      res.send(item);
    });
});
router.get('/commentz/:pid',function(req,res,next){
  const productId=req.params.pid;
  Comment.find({product:productId}).then(function(item){
      res.send(item);
    });
});
router.put("/comments", function (req, res, next) {
  Comment.findByIdAndUpdate(
    { _id: req.body.id },
    {
      message: req.body.message,
    }
  ).then(function () {
    Comment.findOne({ _id: req.body.id }).then(function (single) {
      res.send(single);
    });
  });
});

router.delete("/comments", function (req, res, next) {
  Comment.findByIdAndRemove({ _id: req.body.id }).then(function (item) {
    res.send(item);
  });
});

  

module.exports=router;