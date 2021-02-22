const { DataTypes } = require('sequelize')
module.exports = {
  shop_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category_id: DataTypes.INTEGER,
  goods_id: DataTypes.STRING,
  link: DataTypes.STRING,
  time_stamp: DataTypes.DATE,
  title: DataTypes.TEXT,
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}
