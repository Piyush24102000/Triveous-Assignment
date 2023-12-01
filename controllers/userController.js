const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')

const userLogin = async (req, res) => {
    try {
        /* -------------------Validations---------------------------- */

        let { email, password } = req.body
        if (!email || !password) { return res.status(400).json({ status: false, message: "Please fill all fields" }) }

        /*------------------- Business Logic ------------------------ */
        // Check if Email Present
        let checkIfEmailPresent = await userModel.findOne({ email: email })
        if (!checkIfEmailPresent) { return res.status(400).json({ status: false, message: "Please Provide valid Email" }) }

        // Check Password
        let checkPassword = await bcrypt.compare(password, checkIfEmailPresent.password)
        if (!checkPassword) { return res.status(400).json({ status: false, message: "Password Is Incorrect" }) }

        return res.status(200).json({ status: true, message: "User logged in Successfully " })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

const userRegister = async (req, res) => {
    try {
        /* -------------------Validations---------------------------- */

        let { firstName, lastName, email, password } = req.body
        if (!firstName, !lastName, !email, !password) { return res.status(400).json({ status: false, message: "Please fill all fields" }) }

        /*------------------- Business Logic ------------------------ */

        // check if already present
        let checkIfPresent = await userModel.findOne({ email: email })
        if (checkIfPresent) { return res.status(400).json({ status: false, message: "Email Already present" }) }

        // Password Hashing
        let newPassword = await bcrypt.hash(password, password.length)
        req.body.password = newPassword

        // Create Data
        await userModel.create(req.body)
        return res.status(201).send({ status: true, message: "User Registered successfully" })

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

module.exports = { userLogin, userRegister }