const { DataTypes } = require('sequelize')
const sequelize = require('../../sequelize')
const modelConfig = require('../../../config/modelConfig')

const ProductImg = sequelize.define('s_product_img', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  img: DataTypes.STRING,
  img_src: DataTypes.STRING
}, modelConfig)

module.exports = ProductImg
