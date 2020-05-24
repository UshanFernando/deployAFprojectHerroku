const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const wishListSchema = new Schema({
    user: {type: mongoose.Types.ObjectId, required: true, ref: 'register' },
    quantity: { type: Number, required: true },
    product: {type: mongoose.Types.ObjectId,ref: "StoreProducts"},
    //user: {type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    
});


module.exports = mongoose.model('wishList', wishListSchema);