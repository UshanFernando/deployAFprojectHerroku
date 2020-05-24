const express=require('express');
const router=express.Router();
const Cat = require('../schema/Category');

const StoreProducts = require('../schema/StoreManagerProducts');

// router.post('/newCart', function (req, res, next) {
//     Cart.create({
        
//         user: req.body.user,
//         product: req.body.product,
//         quantity: req.body.quantity,
//       //user: {type: mongoose.Types.ObjectId, required: true, ref: 'User' },
        
//       }
//        ).then(function(item){
//         res.send(item);
//       }).catch(next);
   
//   });
//   router.get('/carts',function(req,res,next){
//     Cart.find({}).then(function(item){
//         res.send(item);
//       });
//   });
  
 
  router.get('/category', async function (req, res, next) {
    Cat.find({}).then(function (item) {
       res.json(item);
    });
  });

    router.get('/category/:cat', async function (req, res, next) {
      const catId=req.params.cat;
      StoreProducts.find({category:catId}).then(function (item) {
         res.json(item);
      });
    });
    router.get('/search/:name', async function (req, res, next) {
      const catId=req.params.name;
      StoreProducts.find({ "productname": { $regex: '.*' + catId + '.*' } },
      function(err,data){
        res.json(data);;
     });
    });
  module.exports=router;