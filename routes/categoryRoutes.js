const express = require('express')
const { getCategory, createCategory } = require('../controllers/categoryController')
const categoryRouter = express.Router()

categoryRouter.get('/', getCategory)
categoryRouter.post('/createCategory',createCategory)

module.exports = categoryRouter