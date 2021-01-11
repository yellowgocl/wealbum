const { DataTypes } = require('sequelize')
module.exports = {
  shop_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: -1,
  },
  shop_name: DataTypes.STRING,
  shop_url: DataTypes.STRING,
  user_icon: DataTypes.STRING,
  new_goods: DataTypes.INTEGER,
  total_goods: DataTypes.INTEGER
}
