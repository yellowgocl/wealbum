const { DataTypes } = require('sequelize')
const sequelize = require('../../sequelize')
const modelConfig = require('../../../config/modelConfig')

const SyncHistory = sequelize.define('s_sync_history', {
  start: DataTypes.DATE,
  end: DataTypes.DATE,
  total: DataTypes.INTEGER
}, modelConfig)

module.exports = SyncHistory
