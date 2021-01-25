const { DataTypes } = require('sequelize')
module.exports = {
  sid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category_id: DataTypes.INTEGER,
  goods_id: DataTypes.STRING,
  link: DataTypes.STRING,
  time_stamp: DataTypes.DATE,
  title: DataTypes.TEXT,
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 1
  }
}
