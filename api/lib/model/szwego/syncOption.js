const { DataTypes } = require('sequelize')
const sequelize = require('../../sequelize')
const modelConfig = require('../../../config/modelConfig')

const SyncOption = sequelize.define('s_sync_option', {
  shop_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  start: DataTypes.DATE
}, modelConfig)

module.exports = SyncOption
