const { DataTypes } = require('sequelize')
const sequelize = require('../../sequelize')
const modelConfig = require('../../../config/modelConfig')
const { assign } = require('lodash')

const Product = sequelize.define('s_product', {
  shop_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category_id: DataTypes.INTEGER,
  goods_id: DataTypes.STRING,
  link: DataTypes.STRING,
  time_stamp: DataTypes.DATE,
  title: DataTypes.TEXT,
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, assign(modelConfig, {
  charset: 'utf8mb4'
}))

module.exports = Product
