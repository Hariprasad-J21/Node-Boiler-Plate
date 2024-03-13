const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('../utils/jwt')
const logger = require('../config/logger')

const registerUser = async (userName, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({ userName, password: hashedPassword })
    } catch {
        ;(error) => {
            logger.log('error', error)
            throw new Error('Error registering user')
        }
    }
}

const loginUser = async (userName, password) => {
    try {
        const activeUser = await User.findOne({ where: { userName } })
        if (!activeUser) {
            throw new Error('No such user found')
        }
        const isPassword = bcrypt.compare(password, activeUser.password)
        if (!isPassword) {
            throw new Error('Invalid Credentials')
        }
        const token = jwt.generateToken(activeUser.id, activeUser.userName)
        return token
    } catch {
        ;(error) => {
            logger.log('error', error)
            throw new Error('Error logging user')
        }
    }
}
module.exports = { registerUser, loginUser }
