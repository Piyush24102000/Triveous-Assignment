const express = require('express')
const { userLogin, userRegister } = require('../controllers/userController')
let userRouter = express.Router()

userRouter.post('/login', userLogin)
userRouter.post('/register', userRegister)

module.exports = userRouter