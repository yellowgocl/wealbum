const { DataTypes } = require('sequelize')
module.exports = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shop_id: DataTypes.STRING,
  shop_name: DataTypes.STRING,
  union_id: DataTypes.STRING,
  token: DataTypes.STRING
}
