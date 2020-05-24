const express=require('express');
const router=express.Router();
const WishList = require('../schema/WishList');
const auth = require("../Authentication/Auth");

router.post('/newWishList',auth, function (req, res, next) {
    WishList.create({
        
        user: req.body.user,
        product: req.body.product,
        quantity: req.body.quantity,
      //user: {type: mongoose.Types.ObjectId, required: true, ref: 'User' },
        
      }
       ).then(function(item){
        res.send(item);
      }).catch(next);
   
  });
  router.get('/wishlists/:Uid', async function (req, res, next) {
    const wishId=req.params.Uid;
    WishList.find({user:wishId})
      .populate('product') 
      .exec(function(err, usersDocuments) {
        res.status(200).json(usersDocuments);
      });
    }); 
  router.get('/count/:Uid/:Pid', async function (req, res, next) {
      const userId=req.params.Uid;
      const prdId=req.params.Pid;
      WishList.find({user:userId, product:prdId}).then(function (item) {
         let cnt=item.length;
         res.json(cnt);
      });
    
    });

  router.delete("/wishlists/:Cid",auth, function (req, res, next) {
    const wishId=req.params.Cid;
    WishList.findByIdAndRemove({ _id: wishId}).then(function (item) {
      res.send(item);
    });
  });

  module.exports=router;