const { DataTypes } = require('sequelize')
module.exports = {
  uid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}
