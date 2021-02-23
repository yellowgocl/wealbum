const { select } = require('../pool')
const User = require('../model/user')
const Role = require('../model/role')
const Permission = require('../model/permission')
const UserRole = require('../model/userRole')
const RolePermission = require('../model/rolePermission')
const { Op } = require('sequelize')
const { assign, isEmpty } = require('lodash')

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
