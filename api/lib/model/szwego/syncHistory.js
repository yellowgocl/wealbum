const { DataTypes } = require('sequelize')
module.exports = {
  start: DataTypes.DATE,
  end: DataTypes.DATE,
  total: DataTypes.INTEGER
}
