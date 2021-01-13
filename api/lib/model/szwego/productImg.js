const { DataTypes } = require('sequelize')
module.exports = {
  pid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  img: DataTypes.STRING,
  imgSrc: DataTypes.STRING
}
