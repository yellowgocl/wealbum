const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize')
const modelConfig = require('../../config/modelConfig')
const Role = require('./role')
const Permission = require('./permission')

const RolePermission = sequelize.define('role_permission', {
  rid: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id'
    }
  },
  pid: {
    type: DataTypes.INTEGER,
    references: {
      model: Permission,
      key: 'id'
    }
  }
}, modelConfig) // 角色权限关系

module.exports = RolePermission
