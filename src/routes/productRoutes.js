const express = require('express')
const productController = require('../controllers/productController')
// const jwtMiddleware = require('../middlewares/jwtMiddleware')
const router = express.Router()

router.post('/product', productController.addProduct)
router.post('/payment', productController.makePayment)
// router.post('/confirm', productController.confirmPaymentIntent)
// router.post('/retrieve', productController.retrieveClientSecret)

module.exports = router
