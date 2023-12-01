const express = require('express')
const cartRouter = express.Router()
const { addToCart, viewCart, updateQuantityInCart, deleteItemFromCart } = require('../controllers/cartController')
const { authenticateUser } = require('../middlewares/authentication')
const { authorizeUser } = require('../middlewares/authorization')


cartRouter.post('/addToCart/:userId', authenticateUser, authorizeUser, addToCart)
cartRouter.get('/viewCart/:userId', authenticateUser, authorizeUser, viewCart)
cartRouter.patch('/updateQuantity/:userId', authenticateUser, authorizeUser, updateQuantityInCart)
cartRouter.delete('/removeItems/:userId', authenticateUser,authorizeUser, deleteItemFromCart)

module.exports = cartRouter