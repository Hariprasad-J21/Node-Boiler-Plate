const jwt = require('jsonwebtoken')

require('dotenv').config()

const verifyToken = (req, res, next) => {
    const token = req.query.token

    if (!token) return res.status(401).json({ message: 'Access denied' })

    try {
        const verified = jwt.verify(token, process.env.secret_key)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' })
    }
}

module.exports = { verifyToken }
