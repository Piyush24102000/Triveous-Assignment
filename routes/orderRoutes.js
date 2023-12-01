const express = require('express')
const { createOrder, getOrderHistory, getOrderById } = require('../controllers/orderController')
const { authenticateUser } = require('../middlewares/authentication')
const { authorizeUser } = require('../middlewares/authorization')
const orderRouter = express.Router()

orderRouter.post('/createOrder/:userId', authenticateUser, authorizeUser, createOrder)
orderRouter.get('/orderHistory/:userId', authenticateUser, authorizeUser, getOrderHistory)
orderRouter.get('/getOrderById/:orderId', authenticateUser, getOrderById)

module.exports = orderRouter