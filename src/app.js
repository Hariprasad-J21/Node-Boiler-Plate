const express = require('express')
const app = express()
const path = require('path')
const authRoutes = require('./routes/authRoutes')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(authRoutes)

module.exports = app
