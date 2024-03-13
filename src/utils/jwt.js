const jwt = require('jsonwebtoken')

require('dotenv').config()

const generateToken = (userId, userName) => {
    const payload = {
        id: userId,
        name: userName,
    }
    return jwt.sign(payload, process.env.secret_key, { expiresIn: '1h' })
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.secret_key)
}

module.exports = { generateToken, verifyToken }
