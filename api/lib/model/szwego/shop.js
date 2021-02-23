const { DataTypes } = require('sequelize')
const sequelize = require('../../sequelize')
const modelConfig = require('../../../config/modelConfig')
const { assign } = require('lodash')

const Shop = sequelize.define('s_shop', {
  album_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  shop_name: DataTypes.STRING,
  shop_url: DataTypes.STRING,
  user_icon: DataTypes.STRING,
  new_goods: DataTypes.INTEGER,
  total_goods: DataTypes.INTEGER
}, assign(modelConfig, { charset: 'utf8mb4' }))

module.exports = Shop
