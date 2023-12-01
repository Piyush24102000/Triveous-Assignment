const jwt = require('jsonwebtoken')
let mongoose = require('mongoose')

const authorizeUser = async (req, res, next) => {
    let userId = req.params.userId
    if (!userId) { return res.status(400).json({ status: false, message: "No User Id Provided" }) }
    if (!mongoose.Types.ObjectId.isValid(userId)) { return res.status(400).json({ status: false, message: "Provide Valid User Id" }) }

    let payload = req.cookies.payload
    if (payload.userId != req.params.userId) {
        return res.status(403).json({ status: false, message: "You are not Authorized ! Please Access your own data " })
    }
    next()
}
module.exports = { authorizeUser }