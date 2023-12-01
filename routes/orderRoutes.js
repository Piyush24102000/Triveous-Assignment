const express = require('express')
const { createOrder, getOrderHistory, getOrderById } = require('../controllers/orderController')
const orderRouter = express.Router()

orderRouter.post('/createOrder/:userId', createOrder)
orderRouter.get('/orderHistory/:userId', getOrderHistory)
orderRouter.get('/getOrderById/:orderId', getOrderById)

module.exports = orderRouter