const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')
const modelConfig = require('../../config/modelConfig')

const Permission = sequelize.define('t_permission', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: DataTypes.STRING
}, modelConfig)

module.exports = Permission
