const { DataTypes } = require('sequelize')
module.exports = {
  shop_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  start: DataTypes.DATE
}
