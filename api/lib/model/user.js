const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')
const modelConfig = require('../../config/modelConfig')

const User = sequelize.define('t_user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: DataTypes.STRING,
  mobile: DataTypes.STRING,
  email: DataTypes.STRING,
  loginTime: DataTypes.DATE,
  loginCount: DataTypes.INTEGER
}, modelConfig)

module.exports = User
