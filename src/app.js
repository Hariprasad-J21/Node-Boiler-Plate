const express = require('express')
const authRoutes = require('../src/routes/authRoutes')
const userRoutes = require('../src/routes/userRoutes')
const productRoutes = require('../src/routes/productRoutes')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/user', productRoutes)

module.exports = app
