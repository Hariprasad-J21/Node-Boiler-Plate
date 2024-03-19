const ejs = require('ejs')
const fs = require('fs')
const transporter = require('../config/nodemailer')
const logger = require('../config/logger')
require('dotenv').config()
const path = require('path')

const sendRegistrationEmail = async (userEmail, username) => {
    try {
        const templatePath = path.join(
            __dirname,
            '..',
            'templates',
            'registration_template.ejs'
        )
        const template = fs.readFileSync(templatePath, 'utf-8')
        const compiledTemplate = ejs.compile(template)
        const html = compiledTemplate({ username: username })

        const mailOptions = {
            from: 'u1901091@rajagiri.edu.in',
            to: userEmail,
            subject: 'Welcome to Our Website!',
            html: html,
        }

        const info = await transporter.sendMail(mailOptions)
        logger.log('error:', 'Email sent: ' + info.response)
        return null
    } catch (error) {
        logger.log('error', 'Error sending email:', error)
        return error.message
    }
}

module.exports = { sendRegistrationEmail }
