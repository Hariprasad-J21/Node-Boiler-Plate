const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { registerValidation } = require('../validations/authValidation')

require('dotenv').config()

const registerUser = async (userData) => {
    const { error } = registerValidation.validate(userData)
    if (error) throw new Error(error.details[0].message)

    try {
        const hashedPassword = await argon2.hash(userData.password)

        const user = new User({
            username: userData.username,
            password: hashedPassword,
        })

        const savedUser = await user.save()
        return savedUser
    } catch (error) {
        throw new Error(error.message)
    }
}

const loginUser = async (userData) => {
    const user = await User.findOne({ where: { username: userData.username } })
    if (!user) throw new Error('Username not found')

    try {
        const validPassword = await argon2.verify(
            user.password,
            userData.password
        )
        if (!validPassword) throw new Error('Invalid password')

        return user
    } catch (error) {
        throw new Error(error.message)
    }
}

const generateAuthToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.secret_key
    )
}

module.exports = { registerUser, loginUser, generateAuthToken }
