const productModel = require("../models/productModel");

const createProduct = async (req, res) => {
    try {
        /* Validations */
        let { title, description, price, available, categoryId } = req.body
        if (!title || !description || !price || available || categoryId) {
            return res.status(400).json({ status: false, message: "Please Enter all fields" })
        }
        /* Business Logic */
        await productModel.create(req.body)
        return res.status(201).json({ status: true, message: "Product Created Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

const getProductsByCategoryId = async (req, res) => {
    try {
        /* Validations */
        let categoryId = req.params.id
        if (!categoryId) { return res.status(400).json({ status: false, message: "Please Provide Category Id" }) }

        /* Business Logic */
        let getProductsByCategoryId = await productModel.find(categoryId)
        if (!getProductsByCategoryId) { return res.status(400).json({ status: false, message: "No Product Found Or Check the Category Id again" }) }
        return res.status(200).json({ status: true, message: getProductsByCategoryId })
   
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

const getProductById = async (req, res) => {
    try {
        /* Validations */
        let productId = req.params.id
        if (!productId) { return res.status(400).json({ status: false, message: "Please Provide Product Id" }) }

        /* Business Logic */
        let getProductById = await productModel.findById(productId)
        if (!getProductById) { return res.status(200).json({ status: false, message: "No Product found by this Id" }) }
        return res.status(200).json({ status: true, message: getProductById })

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

module.exports = { createProduct, getProductsByCategoryId, getProductById }