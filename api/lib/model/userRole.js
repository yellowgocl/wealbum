
const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')
const modelConfig = require('../../config/modelConfig')

const UserRole = sequelize.define('user_role', {
  uid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rid: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, modelConfig)

module.exports = UserRole
