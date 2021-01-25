const { DataTypes } = require('sequelize')
module.exports = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}
