require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const rateLimit = require('express-rate-limit');
const app = express()
const categoryRouter = require('./routes/categoryRoutes')
const productRouter = require('./routes/productRoutes')
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');


// Apply rate limiter 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // maximum 50 requests per window
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

/* Middlewares */
app.use(express.json())

/* Routes */
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)

/* Connection */
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => { console.log("Database and Server Connected on Port 5000") })
    })
    .catch((e) => { console.log(e) })
