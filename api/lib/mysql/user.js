const User = require('../model/user')
const Role = require('../model/role')
const Permission = require('../model/permission')
const UserRole = require('../model/userRole')
const RolePermission = require('../model/rolePermission')
const { Op } = require('sequelize')
const { assign, isEmpty, map } = require('lodash')

User.role = User.belongsToMany(Role, { through: { model: UserRole, unique: false }, as: 'roles', foreignKey: 'uid' })
Role.user = Role.belongsToMany(User, { through: { model: UserRole, unique: false }, as: 'users', foreignKey: 'rid' })

Role.permission = Role.belongsToMany(Permission, { through: { model: RolePermission, unique: false }, as: 'permissions', foreignKey: 'rid' })
Permission.role = Permission.belongsToMany(Role, { through: { model: RolePermission, unique: false }, as: 'roles', foreignKey: 'pid' })

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
  let u = await User.findAll({
    attributes: ['id', 'name', 'avatar', 'mobile', 'email'],
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['name']
      }
    ],
    // raw:true,
    where: {
      name
    }
  }).then(res => {
    // console.log('res:', res)
    const [user] = res
    return user
  }).catch(err => {
    console.log('err:', err)
  })
  u = u.toJSON()
  // const result = assign(u, { roles: [r.name] })
  return new Promise(resolve => {
    resolve(u)
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
