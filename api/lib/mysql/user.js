const { sequelize, select } = require('../pool')
const { user, role, permission, userRole, rolePermission } = require('../model/user')
const { Op } = require('sequelize')
const { assign } = require('lodash')
// 建表
const User = sequelize.define('t_user', user) // 用户表
const Role = sequelize.define('t_role', role) // 角色表
const Permission = sequelize.define('t_permission', permission) // 权限表
const UserRole = sequelize.define('user_role', userRole) // 用户角色关系
const RolePermission = sequelize.define('role_permission', rolePermission) // 角色权限关系

const initTables = async () => {
  await User.sync()
  await Role.sync()
  await Permission.sync()
  await UserRole.sync()
  await RolePermission.sync()
}

initTables()

// 查询用户是否存在
const findUser = async (name) => {
  let result = await select(User, {
    where: {
      name
    }
  })
  return result
}
// 查询用户以及用户角色
const findUserAndRole = async (name) => {
  const u = await select(User, {
    where: {
      name
    }
  })
  const { uid } = await select(UserRole, {
    where: { uid: u.id }
  })
  const role = await select(Role, {
    where: { id: uid }
  })
  let result = assign(u, { roles: [role.name] })
  return result
}

// 更新用户登录次数和登录时间
const updataUserInfo = async (value) => {
  const { name, ...rest } = value
  const u = await User.update(rest, {
    where: {
      name
    }
  })
  let result = u.length > 0 ? u[0]['dataValues'] : null
  return result
}

module.exports = {
  // 暴露方法
  findUser,
  findUserAndRole,
  updataUserInfo
}
