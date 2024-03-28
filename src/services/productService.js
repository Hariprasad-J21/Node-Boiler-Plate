const Product = require('../models/product')
const logger = require('../config/logger')

const createProduct = async (productName, price) => {
    try {
        const product = await Product.create({ productName, price })
        return product
    } catch (error) {
        logger.log('error', error)
        throw new Error('Error creating product')
    }
}

const getProduct = async (productId) => {
    try {
        console.log('product id is', productId)
        const productById = await Product.findOne({ where: { id: productId } })
        return productById
    } catch (error) {
        logger.log('error', error)
        throw new Error('Error finding the product')
    }
}

module.exports = { createProduct, getProduct }
