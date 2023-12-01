const mongoose = require('mongoose')
let ObjectId = mongoose.Schema.Types.ObjectId

let orderSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'userModel'
    },
    products: [
        {
            productId: {
                type: ObjectId,
                ref: 'productModel',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    totalItems: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },

})
module.exports = mongoose.model.orderModel || mongoose.model('orderModel', orderSchema)