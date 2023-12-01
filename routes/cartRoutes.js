const express = require('express')
const { addToCart, viewCart, updateQuantityInCart, deleteItemFromCart } = require('../controllers/cartController')
const cartRouter = express.Router()


cartRouter.post('/addToCart/:userId',addToCart)
cartRouter.get('/viewCart/:userId',viewCart)
cartRouter.patch('/updateQuantity:/userId',updateQuantityInCart)
cartRouter.delete('/removeItems:/userId',deleteItemFromCart)

module.exports = cartRouter