const { DataTypes } = require('sequelize')
const sequelize = require('../../sequelize')
const modelConfig = require('../../../config/modelConfig')

const Img = sequelize.define('s_img', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  thumb: DataTypes.STRING,
  src: DataTypes.STRING
}, modelConfig)

module.exports = Img
