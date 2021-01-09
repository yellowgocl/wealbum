const { DataTypes } = require('sequelize')
module.exports = {
  parrent_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  shop_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category_id: DataTypes.INTEGER,
  shop_name: DataTypes.STRING,
  shop_url: DataTypes.STRING,
  user_icon: DataTypes.STRING,
  new_goods: DataTypes.INTEGER,
  total_goods: DataTypes.INTEGER
}
