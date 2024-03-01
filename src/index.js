const app = require('./app')
const sequelize = require('./config/sequelize')
const logger = require('../src/config/logger')

const PORT = process.env.PORT || 3000

sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            logger.log('info', `Server is running on http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        logger.error('Unable to connect to the database:', error)
    })
