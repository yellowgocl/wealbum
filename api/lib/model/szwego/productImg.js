const { DataTypes } = require('sequelize')
module.exports = {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  img: DataTypes.STRING,
  img_src: DataTypes.STRING
}
