const { DataTypes } = require('sequelize')
module.exports = {
  sid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  start: DataTypes.DATE
}
