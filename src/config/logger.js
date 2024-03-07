const winston = require('winston')
const path = require('path')

const logFolder = 'logs' // Specify the log folder name

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(__dirname, '..', logFolder, 'error.log'),
            level: 'error',
        }),
        new winston.transports.File({
            filename: path.join(__dirname, '..', logFolder, 'combined.log'),
        }),
    ],
})

module.exports = logger
