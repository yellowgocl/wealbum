const { DataTypes } = require('sequelize')
module.exports = {
  sync_history_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  shop_id: DataTypes.INTEGER
}
