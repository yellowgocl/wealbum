const { DataTypes } = require('sequelize')
module.exports = {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  shop_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}
