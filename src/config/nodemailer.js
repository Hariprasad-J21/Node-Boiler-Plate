const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: process.env.service,
    auth: {
        user: process.env.user,
        pass: process.env.pass,
    },
    tls: {
        rejectUnauthorized: false,
    },
})

module.exports = transporter
