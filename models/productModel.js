const mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
    title: {
        type: String,
        requried: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    categoryId: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model.productModel || mongoose.model('productModel', productSchema)