const { DataTypes } = require('sequelize')
const sequelize = require('../../sequelize')
const modelConfig = require('../../../config/modelConfig')

const Category = sequelize.define('s_category',{
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, modelConfig)

module.exports = Category
