const Joi = require('joi')

const registerValidation = Joi.object({
    userName: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
})

module.exports = registerValidation
