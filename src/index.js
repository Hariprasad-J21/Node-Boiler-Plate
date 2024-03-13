const app = require('../src/app')
const sequelize = require('../src/config/sequelize')
const logger = require('../src/config/logger')

const PORT = process.env.PORT || 3000

sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            logger.log('info', `The app is running at port ${PORT}`)
        })
    })
    .catch((error) => {
        logger.log('error', 'Unable to connect due to', error)
    })
