const mongoose = require('mongoose')
let ObjectId = mongoose.Schema.Types.ObjectId

let cartSchema = new mongoose.Schema({

    userId: {
        type: ObjectId,
        ref: 'userModel',
        required: true,
        unique: true
    },
    cart: [
        {
            productId: {
                type: ObjectId,
                ref: 'productModel',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    totalItems: {
        type: Number
    },
    totalPrice: {
        type: Number
    }
})
module.exports = mongoose.model.cartModel || mongoose.model('cartModel', cartSchema)