const authService = require('../services/authService')
const logger = require('../config/logger')

const renderRegisterForm = (req, res) => {
    res.render('register')
}

const renderLoginForm = (req, res) => {
    res.render('login')
}

const register = async (req, res) => {
    try {
        await authService.registerUser(req.body)
        res.redirect('/login')
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const user = await authService.loginUser(req.body)
        const token = authService.generateAuthToken(user)
        logger.log('info', 'Generated Token:', token)
        res.redirect(`/home?token=${token}`)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const renderProtectedPage = (req, res) => {
    res.render('home', { username: req.user.username })
}

module.exports = {
    renderRegisterForm,
    renderLoginForm,
    register,
    login,
    renderProtectedPage,
}
