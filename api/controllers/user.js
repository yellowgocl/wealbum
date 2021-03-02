const userSql = require("../lib/mysql/user") // 引入数据库方法
const jwt = require("jsonwebtoken")
const config = require("../config/defaultConfig.js")
const ApiErrorNames = require("../error/ApiErrorNames.js")
const moment = require("moment")
const { isUndefined, isNull, assign, map } = require("lodash")

/**
 * 普通登录
 */
exports.login = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const user = await userSql.findUser(body.username)
    if (!user) {
      // ctx.status = 401
      ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_NOT_EXIST)
      return
    }
    const bodys = JSON.parse(JSON.stringify(user))
    // // 匹配密码是否相等
    if (user.password === body.password) {
      const data = {
        user: user.name,
        token: jwt.sign(
          {
            data: user.name,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 60 seconds * 60 minutes = 1 hour
          },
          config.secret
        ),
      }
      ctx.body = ApiErrorNames.getSuccessInfo(data)
    } else {
      ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_LOGIN_ERROR)
    }
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 获取用户信息
 */
exports.info = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const authValue = ctx.header.authorization
    const token = isUndefined(authValue) ? null : authValue
    const { user, flag, message } = await userSql.findUserByToken(token)
    if (flag) {
      await userSql.updataUserInfo({
        login_count: Number(user.login_count) + 1,
        login_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        id: user.id
      })
      const data = {
        avatar: user.avatar,
        name: user.name,
        roles: user.roles,
      }
      ctx.body = ApiErrorNames.getSuccessInfo(data)
    } else {
      ctx.body = ApiErrorNames.getErrorInfo(message)
    }
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 退出登录
 */
exports.logout = async (ctx, next) => {
  try {
    // ctx.status = 200
    ctx.body = ApiErrorNames.getSuccessInfo("退出登陆")
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 增加账户
 */
exports.add = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const { username, password, role } = body
    const u = await userSql.add({
      name: username,
      password,
      role
    })
    ctx.body = ApiErrorNames.getSuccessInfo(u.toJSON())
  } catch (error) {
    if (error.parent.code === "ER_DUP_ENTRY" && error.parent.errno === 1062) {
      ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_HAS_EXISTED)
    } else {
      ctx.throw(500)
    }
  }
}

/**
 * 删除账户
 */
exports.remove = async (ctx, next) => {
  const { body } = ctx.request
  try {
    console.log(body)
    const u = await userSql.remove(body)
    ctx.body = ApiErrorNames.getSuccessInfo(u)
  } catch (error) {
    ctx.throw(500)
  }
}

exports.list = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const authValue = ctx.header.authorization
    const token = isUndefined(authValue) ? null : authValue
    const { user, flag, message } = await userSql.findUserByToken(token)
    if (flag) {
      const { roles: [name] } = user
      if (name === 'admin') {
        const list = await userSql.list()
        ctx.body = ApiErrorNames.getSuccessInfo(list)
      } else {
        ctx.body = ApiErrorNames.getErrorInfo('当前用户不是管理员, 无法获取用户列表！')
      }
    } else {
      ctx.body = ApiErrorNames.getErrorInfo(message)
    }
  } catch (error) {
    ctx.throw(500)
  }
}
