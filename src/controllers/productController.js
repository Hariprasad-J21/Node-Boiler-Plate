const productService = require('../services/productService')
const userService = require('../services/userService')
const logger = require('../config/logger')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const addProduct = async (req, res) => {
    try {
        const { productName, price } = req.body
        if (productName && price) {
            await productService.createProduct(productName, price)
            res.status(200).json('Product is created successfully')
        } else {
            res.status(404).json('Missing fields in the body')
        }
    } catch (error) {
        logger.log('error', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const makePayment = async (req, res) => {
    const { userId, productId } = req.body

    try {
        const user = await userService.getElementById(userId)
        const product = await productService.getProduct(productId)

        const paymentIntent = await stripe.paymentIntents.create({
            amount: product.price,
            currency: 'inr',
            description: `Payment for ${product.productName}`,
            payment_method_types: ['card'],
            // confirm: true,
            metadata: {
                userId: user.id,
                productId: product.id,
            },
            shipping: {
                name: user.userName,
                address: {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'US',
                },
            },
        })

        res.send({
            clientSecret: paymentIntent.client_secret,
        })
    } catch (error) {
        logger.error(error)
        res.status(500).json({ success: false, error: 'Internal Server Error' })
    }
}

module.exports = { addProduct, makePayment }
