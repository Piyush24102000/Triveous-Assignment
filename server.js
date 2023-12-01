require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const categoryRouter = require('./routes/categoryRoutes')
const productRouter = require('./routes/productRoutes')
const userRouter = require('./routes/userRoutes')

/* Middlewares */
app.use(express.json())

/* Routes */
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)
app.use('/api/user', userRouter)


/* Connection */
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => { console.log("Database and Server Connected on Port 5000") })
    })
    .catch((e) => { console.log(e) })
