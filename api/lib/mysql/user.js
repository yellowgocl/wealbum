const User = require('../model/user')
const Role = require('../model/role')
const Permission = require('../model/permission')
const UserRole = require('../model/userRole')
const RolePermission = require('../model/rolePermission')
const { Op } = require('sequelize')
const { assign, isEmpty, map, isNull } = require('lodash')
const jwt = require("jsonwebtoken")
const ApiErrorNames = require("../../error/ApiErrorNames")
const config = require("../../config/defaultConfig")

const force = false

User.role = User.belongsToMany(Role, { through: { model: UserRole, unique: false }, as: 'roles', foreignKey: 'uid' })
Role.user = Role.belongsToMany(User, { through: { model: UserRole, unique: false }, as: 'users', foreignKey: 'rid' })

Role.permission = Role.belongsToMany(Permission, { through: { model: RolePermission, unique: false }, as: 'permissions', foreignKey: 'rid' })
Permission.role = Permission.belongsToMany(Role, { through: { model: RolePermission, unique: false }, as: 'roles', foreignKey: 'pid' })

const initTables = async () => {
  await User.sync({ force })
  await Role.sync({ force })
  await Permission.sync({ force })
  await UserRole.sync({ force })
  await RolePermission.sync({ force })
}

initTables()

const add = async (info) => {
  const { role, ...rest } = info
  const u = await User.create(rest)
  await UserRole.create({
    uid: u.toJSON().id,
    rid: Number(role)
  })
  return u
}

const remove = async (info) => {
  const { id } = info
  const u = await User.destroy({
    where: {
      id
    }
  })
  await UserRole.destroy({
    where: {
      uid: id
    }
  })
  return u
}

const list = async () => {
  const list = await User.findAll({
    attributes: ['id', 'name', 'avatar', 'mobile', 'email', 'password'],
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['name']
      }
    ]
  })
    .then(res => {
      const l = map(res, o => {
        const { roles, ...rest } = o.toJSON()
        const [{ name }] = roles
        return assign(rest, {role: name})
      })
      return l
    })
    .catch(err => { 
      console.log('err:', err)
    })
  return new Promise(resolve => {
    resolve(list)
  })
}

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
    attributes: ['id', 'name', 'avatar', 'mobile', 'email', 'login_count'],
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
  const roles = map(u.roles, o => {
    return o.name
  })
  u = assign(u, { roles })
  // const result = assign(u, { roles: [r.name] })
  return new Promise(resolve => {
    resolve(u)
  })
}

// 更新用户登录次数和登录时间
const updataUserInfo = async (value) => {
  const { id, ...rest } = value
  await User.update(rest, {
    where: {
      id
    }
  }).catch(err => {
    console.log(err)
  })
  return new Promise(resolve => {
    resolve(value)
  })
}

const findUserByToken = async (token) => {
  let resData = {
    flag: false,
    user: {},
    message: ApiErrorNames.USER_LOGIN_ERROR
  }
  if (isNull(token)) {
    assign(resData, { message: ApiErrorNames.INVALID_TOKEN })
  } else {
    let payload = null
    try {
      payload = await jwt.verify(token.split(" ")[1], config.secret)
    } catch (error) {
      assign(resData, { message: ApiErrorNames.INVALID_TOKEN })
    }
    const user = await findUserAndRole(payload.data)
    if (!user) {
      assign(resData, { message: ApiErrorNames.USER_NOT_EXIST })
    } else {
      assign(resData, {user, flag:true, message: ApiErrorNames.SUCCESS })
    }
  }
  return new Promise((resolve, reject) => {
    resolve(resData)
  })
}

module.exports = {
  // 暴露方法
  findUser,
  findUserAndRole,
  findUserByToken,
  updataUserInfo,
  list,
  add,
  remove
}
