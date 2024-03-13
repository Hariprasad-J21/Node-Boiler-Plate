const jwt = require('../utils/jwt')
const logger = require('../config/logger')

const jwtMiddleWare = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(401).json('Unauthorized')
    }

    try {
        const decoded = jwt.verifyToken(token)
        logger.log('info', decoded)
        req.user = decoded

        next()
    } catch (error) {
        logger.log('error', error)
        res.status(401).json({ error: 'Unauthorized' })
    }
}

module.exports = jwtMiddleWare
