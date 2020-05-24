const mongoose=require('mongoose');
const Schema =mongoose.Schema;
mongoose.set('useFindAndModify', false);

const category=new Schema({

  name:{
    type:String,
    required:[true,"name should be defined"]
  }
});

const Category=mongoose.model('productCategories',category);
module.exports=Category;

