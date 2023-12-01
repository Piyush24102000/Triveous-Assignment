const jwt = require('jsonwebtoken')

const authenticateUser = async (req, res, next) => {
    try {
        let token = req.cookies.token
        if (!token) { return res.status(401).json({ status: false, message: "Token Not Present! Please Log In" }) }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ status: false, message: err.message })
            } else {
                res.cookie('payload', user, { httpOnly: true })
                next()
            }
        })
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

module.exports = { authenticateUser }