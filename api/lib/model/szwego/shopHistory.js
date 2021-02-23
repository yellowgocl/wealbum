const { DataTypes } = require('sequelize')
const sequelize = require('../../sequelize')
const modelConfig = require('../../../config/modelConfig')
const SyncHistory = require('./syncHistory')
const Shop = require('./shop')

const ShopHistory = sequelize.define('s_sync_shop_history', {
  sync_history_id: {
    type: DataTypes.INTEGER,
    references: {
      model: SyncHistory,
      key: 'id'
    }
  },
  shop_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Shop,
      key: 'id'
    }
  }
}, modelConfig)

module.exports = ShopHistory
