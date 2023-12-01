const mongoose = require("mongoose")
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")
const cartModel = require("../models/cartModel")

const addToCart = async (req, res) => {
    try {
        /*------------------------- Validations---------------------- */
        const userId = req.params.userId
        const productId = req.body.productId
        let quantity = req.body.quantity

        if (!mongoose.Types.ObjectId.isValid(userId)) { return res.status(400).json({ status: false, message: "Enter Valid User Id" }) }
        if (!mongoose.Types.ObjectId.isValid(productId)) { return res.status(400).json({ status: false, message: "Enter Valid Product Id" }) }
        if (!quantity) { return res.status(400).json({ status: false, message: "Give Quantity" }) }

        // check if userId is valid or not
        let checkUserValid = await userModel.findById(userId)
        if (!checkUserValid) { return res.status(400).json({ status: false, message: "User with this ID Not found" }) }

        // Check if productId is valid or not
        let productValid = await productModel.findById(productId)
        if (!productValid) { return res.status(400).json({ status: false, message: "Product with this ID Not found" }) }

        /*------------------------Business Logic------------------------------ */
        /* We will have 3 cases 
            1) When the cart is empty and user wants to add a new Product
            2) When the cart is not Empty, But user wants to add the same Product
            3) When the cart is not Empty and user want to add another product
        */

        /* --------------------Case 1--------------------- */
        let checkIfCartExists = await cartModel.findOne({ userId: userId })

        if (!checkIfCartExists) {
            let data = {
                userId: userId,
                cart: { productId: productId, quantity: quantity },
                totalItems: 1,
                totalPrice: productValid.price * quantity
            }
            await cartModel.create(data)
            return res.status(201).json({ status: true, message: "Cart created and product added to cart" })
        }

        /* -------------------Case 2------------------------ */
        let userCart = checkIfCartExists.cart //Array of Products
        for (let i = 0; i < userCart.length; i++) {
            if (userCart[i].productId == productId) {
                userCart[i].quantity += quantity
                totalPrice = checkIfCartExists.totalPrice + productValid.price * quantity
                let updateData = await cartModel.findOneAndUpdate({ userId: userId }, { $set: { cart: userCart, totalPrice: totalPrice } }, { new: true })
                return res.status(201).send({ status: true, message: "Product added to cart" })
            }
        }

        /* ------------------ Case 3 ----------------------- */
        let newProductData = {
            productId: productId,
            quantity: quantity
        }
        totalPrice = checkIfCartExists.totalPrice + productValid.price * quantity
        let updateData = await cartModel.findOneAndUpdate({ userId: userId }, { $push: { cart: newProductData }, $set: { totalPrice: totalPrice }, $inc: { totalItems: 1 } }, { new: true })
        return res.status(201).send({ status: true, message: "Product added to cart" })

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

const viewCart = async (req, res) => {
    try {
        /*------------------------- Validations---------------------- */
        const userId = req.params.userId
        if (!mongoose.Types.ObjectId.isValid(userId)) { return res.status(400).json({ status: false, message: "Enter Valid User Id" }) }

        /*------------------------ Business Logic------------------ */
        // check if userId is valid or not
        let checkUserValid = await userModel.findById(userId)
        if (!checkUserValid) { return res.status(400).json({ status: false, message: "User with this ID Not found" }) }

        let viewCart = await cartModel.find({ userId: userId }).select({ cart: 1, _id: 0 })
        return res.status(200).json({ status: true, message: viewCart })

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

const updateQuantityInCart = async (req, res) => {
    try {
        /*------------------------- Validations ----------------------- */
        const userId = req.params.userId
        const productId = req.body.productId
        let quantity = req.body.quantity

        if (!mongoose.Types.ObjectId.isValid(userId)) { return res.status(400).json({ status: false, message: "Enter Valid User Id" }) }
        if (!mongoose.Types.ObjectId.isValid(productId)) { return res.status(400).json({ status: false, message: "Enter Valid Product Id" }) }
        if (quantity < 0) { return res.status(400).json({ status: false, message: "Give Valid Quantity" }) }

        // check if userId is valid or not
        let checkUserValid = await userModel.findById(userId)
        if (!checkUserValid) { return res.status(400).json({ status: false, message: "User with this ID Not found" }) }

        // Check if productId is valid or not
        let productValid = await productModel.findById(productId)
        if (!productValid) { return res.status(400).json({ status: false, message: "Product with this ID Not found" }) }

        /* --------------------------Business Logic------------------- */
        /* Cases to handle
            1) Increase / Decrease the product count vice versa on the totalPrice 
            2) If the quanity becomes 0 remove from the cart
        */
        let getCart = await cartModel.findOne({ userId: userId })
        let userCart = getCart.cart

        for (let i = 0; i < userCart.length; i++) {
            if (userCart[i].productId == productId) {
                let price = getCart.totalPrice
                let tempTotalItems = getCart.totalItems
                let originalQuantity = userCart[i].quantity // original =  3        

                if (quantity > originalQuantity) { // quantity = 5 
                    let quantityIncrease = quantity - originalQuantity // 2 
                    userCart[i].quantity = quantity
                    price += productValid.price * quantityIncrease
                }
                else {
                    let quantityDecrease = originalQuantity - quantity
                    userCart[i].quantity = quantity
                    price -= productValid.price * quantityDecrease
                }
                if (userCart[i].quantity == 0) {
                    userCart.splice(i, 1)
                    tempTotalItems--
                }
                let updateCart = await cartModel.findOneAndUpdate({ userId: userId }, { $set: { cart: userCart, totalItems: tempTotalItems, totalPrice: price } }, { new: true })
                return res.status(200).json({ status: true, message: "Count Updated Successfully" })
            }
        }

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

const deleteItemFromCart = async (req, res) => {
    try {
        /*------------------------- Validations ----------------------- */
        const userId = req.params.userId
        const productId = req.body.productId

        if (!mongoose.Types.ObjectId.isValid(userId)) { return res.status(400).json({ status: false, message: "Enter Valid User Id" }) }
        if (!mongoose.Types.ObjectId.isValid(productId)) { return res.status(400).json({ status: false, message: "Enter Valid Product Id" }) }

        // check if userId is valid or not
        let checkUserValid = await userModel.findById(userId)
        if (!checkUserValid) { return res.status(400).json({ status: false, message: "User with this ID Not found" }) }

        // Check if productId is valid or not
        let productValid = await productModel.findById(productId)
        if (!productValid) { return res.status(400).json({ status: false, message: "Product with this ID Not found" }) }

        /*------------------------ Business Logic------------------ */
        let getCart = await cartModel.findOne({ userId: userId })
        let userCart = getCart.cart
        let totalPrice = getCart.totalPrice
        let totalItems = getCart.totalItems

        for (let i = 0; i < userCart.length; i++) {
            if (userCart[i].productId == productId) {
                totalPrice -= productValid.price * userCart[i].quantity
                totalItems--
                userCart.splice(i, 1)
            }
        }
        let deleteItem = await cartModel.findOneAndUpdate({ userId: userId }, { $set: { cart: userCart, totalPrice, totalItems } }, { new: true })
        return res.status(200).json({ status: true, message: "Item Removed from Cart" })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

module.exports = { addToCart, viewCart, updateQuantityInCart, deleteItemFromCart }