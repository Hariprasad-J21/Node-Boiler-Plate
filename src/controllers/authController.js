const authService = require('../services/authService')
const registerValidation = require('../validations/authValidation')

const register = async (req, res) => {
    try {
        const { error } = registerValidation.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }
        const { userName, password } = req.body
        if (userName && password) {
            await authService.registerUser(userName, password)
            res.status(200).json('User is succesfully registered')
        } else {
            res.status(404).json('Missing fields in the body')
        }
    } catch {
        ;(error) => {
            res.status(500).json('Internal Server Error', error)
        }
    }
}

const login = async (req, res) => {
    try {
        const { userName, password } = req.body
        if (userName && password) {
            const token = await authService.loginUser(userName, password)
            res.status(200).json(token)
        } else {
            res.status(404).json('Missing fields in the body')
        }
    } catch {
        ;(error) => {
            res.status(500).json('Internal Server Error', error)
        }
    }
}

module.exports = { register, login }
