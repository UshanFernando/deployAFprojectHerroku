const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const cartSchema = new Schema({
    user: {type: mongoose.Types.ObjectId, required: true, ref: 'register' },
    //product: { type: String},
    quantity: { type: Number, required: true },
    product: {type: mongoose.Types.ObjectId,ref: "StoreProducts"},
    
});


module.exports = mongoose.model('cart', cartSchema);