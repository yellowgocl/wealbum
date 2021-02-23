const { DataTypes } = require('sequelize')
const sequelize = require('../../sequelize')
const modelConfig = require('../../../config/modelConfig')
const User = require('./user')
const Shop = require('./shop')

const UserShop = sequelize.define('s_user_shop', {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  shop_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Shop,
      key: 'id'
    }
  },
}, modelConfig)

module.exports = UserShop
