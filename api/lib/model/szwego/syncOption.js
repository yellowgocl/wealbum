const { DataTypes } = require('sequelize')
module.exports = {
  sid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  start_date: DataTypes.DATE,
  end_date: DataTypes.DATE
}
