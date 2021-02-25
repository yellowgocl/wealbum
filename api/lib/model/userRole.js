
const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')
const modelConfig = require('../../config/modelConfig')
const User = require('./user')
const Role = require('./role')

const UserRole = sequelize.define('user_role', {
  uid: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  rid: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id'
    }
  }
}, modelConfig)

module.exports = UserRole
