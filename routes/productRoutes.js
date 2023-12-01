const express = require('express')
const { createProduct, getProductsByCategoryId, getProductById } = require('../controllers/productController')
const productRouter = express.Router()

productRouter.post('/createProduct', createProduct)
productRouter.get('/getProductsByCategory/:id', getProductsByCategoryId)
productRouter.get('/getProductById/:id', getProductById)

module.exports = productRouter
