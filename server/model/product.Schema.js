const mongoose = require('mongoose');
const { PRODUCT } = require('../constants');
const { v4: uuidv4 } = require("uuid");
const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => PRODUCT + ":" + uuidv4(),
    },
    productId:{
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true
    },
    uploadedImages: {
        type: [String],
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    epxiryDate: {
        type: String,
    },
    manufacturingDate: {
        type: String,
    }
},  {
    _id: false, // Disable the _id field
    versionKey: false, // Disable the __v field
  });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
