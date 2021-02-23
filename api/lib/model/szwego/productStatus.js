const { DataTypes } = require('sequelize')
const sequelize = require('../../sequelize')
const modelConfig = require('../../../config/modelConfig')

const ProductStatus = sequelize.define('s_product_status', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, modelConfig)

module.exports = ProductStatus
