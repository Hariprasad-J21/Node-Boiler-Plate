const express = require('express')
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/register', authController.renderRegisterForm)
router.post('/register', authController.register)
router.get('/login', authController.renderLoginForm)
router.post('/login', authController.login)
router.get(
    '/home',
    authMiddleware.verifyToken,
    authController.renderProtectedPage
)

module.exports = router
