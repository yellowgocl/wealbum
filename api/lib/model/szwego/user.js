const { DataTypes } = require('sequelize')
const sequelize = require('../../sequelize')
const modelConfig = require('../../../config/modelConfig')

const User = sequelize.define('s_user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  album_id: DataTypes.STRING,
  shop_name: DataTypes.STRING,
  union_id: DataTypes.STRING,
  token: DataTypes.STRING
}, modelConfig)

module.exports = User
