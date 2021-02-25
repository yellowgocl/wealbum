const User = require('../model/user')
const Role = require('../model/role')
const Permission = require('../model/permission')
const UserRole = require('../model/userRole')
const RolePermission = require('../model/rolePermission')
const { Op, literal } = require('sequelize')
const { assign, isEmpty } = require('lodash')

User.belongsToMany(Role, { through: UserRole, foreignKey: 'uid', as: 'roles' })
Role.belongsToMany(User, { through: UserRole, foreignKey: 'rid', as: 'users' })

Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'rid', as: 'permissions' })
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'pid', as: 'roles' })

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
  const u = await User.findOne({
    where: {
      name
    }
  })
  return new Promise(resolve => {
    resolve(u)
  })
}
// 查询用户以及用户角色
const findUserAndRole = async (name) => {
  let u = await User.findOne({
    where: {
      name
    }
  })
  u = u.toJSON()
  let ur = await UserRole.findOne({
    where: { uid: u.id }
  })
  ur = ur.toJSON()
  const { rid } = ur
  let r = await Role.findOne({
    where: { id: rid }
  })
  r = r.toJSON()
  const result = assign(u, { roles: [r.name] })
  return new Promise(resolve => {
    resolve(result)
  })
}

// 更新用户登录次数和登录时间
const updataUserInfo = async (value) => {
  const { id, ...rest } = value
  let u = await User.update(rest, {
    where: {
      id
    }
  })
  return new Promise(resolve => {
    resolve(value)
  })
}

module.exports = {
  // 暴露方法
  findUser,
  findUserAndRole,
  updataUserInfo
}
