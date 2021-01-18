const { DataTypes } = require('sequelize')
module.exports = {
  shid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sid: DataTypes.INTEGER
}
