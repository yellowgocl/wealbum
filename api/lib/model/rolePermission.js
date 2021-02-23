const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')
const modelConfig = require('../../config/modelConfig')

const RolePermission = sequelize.define('role_permission', {
  rid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pid: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, modelConfig) // 角色权限关系

module.exports = RolePermission
