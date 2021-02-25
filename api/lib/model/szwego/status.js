const { DataTypes } = require('sequelize')
const sequelize = require('../../sequelize')
const modelConfig = require('../../../config/modelConfig')

const Status = sequelize.define('s_status', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, modelConfig)

module.exports = Status
