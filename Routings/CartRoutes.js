const express=require('express');
const router=express.Router();
const Cart = require('../schema/Cart');
const auth = require("../Authentication/Auth");
const StoreProducts = require('../schema/StoreManagerProducts');

router.post('/newCart',auth, function (req, res, next) {
    Cart.create({
        
        user: req.body.user,
        product: req.body.product,
        quantity: req.body.quantity,
      //user: {type: mongoose.Types.ObjectId, required: true, ref: 'User' },
        
      }
       ).then(function(item){
        res.send(item);
      }).catch(next);
   
  });
  router.get('/carts',function(req,res,next){
    Cart.find({}).then(function(item){
        res.send(item);
      });
  });
  
 
  router.get('/carts/:Uid', async function (req, res, next) {
    const userId=req.params.Uid;
     Cart.find({user:userId}).then(function (item) {
       res.status(200).json(item);
    });

});
router.get('/count/:Uid/:Pid', async function (req, res, next) {
  const userId=req.params.Uid;
  const prdId=req.params.Pid;
   Cart.find({user:userId, product:prdId}).then(function (item) {
     let cnt=item.length;
     res.json(cnt);
  });

});

router.get('/cartz/:Uid', async function (req, res, next) {
  const userId=req.params.Uid;
  Cart.find({user:userId})
    .populate('product') 
    .exec(function(err, usersDocuments) {
      res.status(200).json(usersDocuments);
    });
  });

  router.delete("/carts/:Cid",auth, function (req, res, next) {
    const cartId=req.params.Cid;
    Cart.findByIdAndRemove({ _id: cartId}).then(function (item) {
      res.send(item);
    });
  });

  router.put("/carts",auth, function (req, res, next) {
    Cart.findByIdAndUpdate(
      { _id: req.body.id },
      {
        quantity: req.body.quantity,
      }
    ).then(function () {
      Cart.findOne({ _id: req.body.id }).then(function (single) {
        res.send(single);
      });
    });
  });
  module.exports=router;