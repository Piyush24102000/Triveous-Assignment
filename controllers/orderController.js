const orderModel = require("../models/orderModel");
const cartModel = require('../models/cartModel')
const userModel = require("../models/userModel")

const mongoose = require('mongoose')

const createOrder = async (req, res) => {
    try {
        /* ---------------------Validation---------------------- */
        let userId = req.params.userId
        if (!mongoose.Types.ObjectId.isValid(userId)) { return res.status(400).json({ status: false, message: "Please Provide Valid User Id" }) }

        // check if userId is valid or not
        let checkUserValid = await userModel.findById(userId)
        if (!checkUserValid) { return res.status(404).json({ status: false, message: "User with this ID Not found" }) }

        /* --------------------Business Logic------------------- */
        let getCartDetails = await cartModel.findOne({ userId: userId })
        if (!getCartDetails) { return res.status(400).json({ status: false, message: "Cannot find Cart" }) }

        let cart = getCartDetails.cart
        let totalPrice = getCartDetails.totalPrice
        let totalItems = getCartDetails.totalItems

        await orderModel.create({ userId: userId, products: cart, totalPrice, totalItems })
        return res.status(201).json({ status: true, message: "Order Created" })

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

const getOrderHistory = async (req, res) => {
    try {
        /* ---------------------Validation---------------------- */
        let userId = req.params.userId
        if (!mongoose.Types.ObjectId.isValid(userId)) { return res.status(400).json({ status: false, message: "Please Provide Valid User Id" }) }

        // check if userId is valid or not
        let checkUserValid = await userModel.findById(userId)
        if (!checkUserValid) { return res.status(404).json({ status: false, message: "User with this ID Not found" }) }

        /* --------------------Business Logic------------------- */
        let getOrderHistory = await orderModel.find({ userId: userId }).sort({ orderDate: -1 })
        return res.status(200).json({ status: true, message: getOrderHistory })

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

const getOrderById = async (req, res) => {
    try {
        /* ---------------------Validation---------------------- */
        let orderId = req.params.orderId
        if (!mongoose.Types.ObjectId.isValid(orderId)) { return res.status(400).json({ status: false, message: "Please Provide Valid Order Id" }) }

        /* --------------------Business Logic------------------- */
        let getOrder = await orderModel.findById(orderId)
        return res.status(200).json({ status: true, message: getOrder })

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}
module.exports = { createOrder, getOrderHistory, getOrderById }