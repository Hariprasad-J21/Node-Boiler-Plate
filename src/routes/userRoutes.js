const express = require('express')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const router = express.Router()

router.get('/profile', jwtMiddleware, userController.viewProfile)
router.put('/profile', jwtMiddleware, userController.updateProfile)
router.delete('/profile', jwtMiddleware, userController.deleteProfile)

module.exports = router
