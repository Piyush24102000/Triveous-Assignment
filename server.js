require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const rateLimit = require('express-rate-limit');
const app = express()
const router = express.Router()
const cookieParser = require('cookie-parser')
const categoryRouter = require('./routes/categoryRoutes')
const productRouter = require('./routes/productRoutes')
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');

// Apply rate limiter 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // maximum 50 requests per window
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

/* Middlewares */
app.use(cookieParser())
app.use(express.json())

/* Routes */
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
router.all("/*", (req, res) => { return res.status(400).json({ status: false, message: "Invalid path" }) });

/* Connection */
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => { console.log("Database and Server Connected on Port 5000") })
    })
    .catch((e) => { console.log(e) })
