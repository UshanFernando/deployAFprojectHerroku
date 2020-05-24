const mongoose=require('mongoose');

const StoreManagerProducts=mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId,

   productname:{
      type:String,
      required:[true,"Productname should be defined"]
    },
      category:{
        type:String,
    
      },
      price:{
        type:Number,
        required:[true,"Price should be defined"]
      },
      discount:{
        type:Number,
        required:[true,"Discount should be defined"]
      },
      description:{
        type:String,
        required:[true,"Description should be defined"]
      },
      productImage:{
        type:String,
    
      }
     
  });
  
  module.exports=mongoose.model('StoreProducts',StoreManagerProducts);
 
  



