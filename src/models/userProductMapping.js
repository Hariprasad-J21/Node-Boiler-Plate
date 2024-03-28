const sequelize = require('../config/sequelize')
const { DataTypes } = require('sequelize')

const UserProductMapping = sequelize.define('UserProductMapping', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

module.exports = UserProductMapping
