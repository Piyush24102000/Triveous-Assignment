const categoryModel = require('../models/categoryModel')

/* Get All Categories */
const getCategory = async (req, res) => {
    try {
        let getCategory = await categoryModel.find()
        return res.status(200).json({ status: true, message: getCategory })
    } catch (error) {
        return res.status(500).json({ message: error.message, status: false })
    }
}

/* Create a Category */
const createCategory = async (req, res) => {
    try {
        let { id, name } = req.body
        /* Validations */
        if (!id || !name) {
            return res.status(400).json({ status: false, message: "Please Enter all fields" })
        }
        /* Business Logic */
        let checkIfPresent = await categoryModel.findOne({ $or: [{ id }, { name }] })
        if (checkIfPresent) {
            return res.status(400).json({ status: false, message: "Id or Name already Present" })
        }
        await categoryModel.create({ id, name })
        return res.status(201).json({ status: true, message: "Category Created Successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message, status: false })
    }
}

module.exports = { getCategory, createCategory }