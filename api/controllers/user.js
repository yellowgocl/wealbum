const userSql = require('../lib/mysql/user') // 引入数据库方法
const jwt = require('jsonwebtoken')
const config = require('../config/defaultConfig.js')
const ApiErrorNames = require('../error/ApiErrorNames.js')
const moment = require('moment')
const { isUndefined, isNull } = require('lodash')

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
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 60 seconds * 60 minutes = 1 hour
          },
          config.secret
        )
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
    const token = isUndefined(ctx.header.authorization) ? null : ctx.header.authorization
    let payload = null
    if (!isNull(token)) {
      try {
        payload = await jwt.verify(token.split(' ')[1], config.secret)
      } catch (error) {
        ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.INVALID_TOKEN)
        return
      }
      // payload = await jwt.verify(token.split(' ')[1], config.secret) // 解密，获取payload
      const user = await userSql.findUserAndRole(payload.data)
      if (!user) {
        ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_NOT_EXIST)
      } else {
        const updateInfo = await userSql.updataUserInfo({
          loginCount: user.loginCount + 1,
          loginTime: moment().format('YYYY-MM-DD HH:mm:ss'),
          name: user.name
        })
        const data = {
          avatar: user.avatar,
          name: user.name,
          roles: user.roles
        }
        ctx.body = ApiErrorNames.getSuccessInfo(data)
      //   const cont = user.user_count + 1
      //   const updateInfo = [cont, moment().format('YYYY-MM-DD HH:mm:ss'), user.id]
      //   await userSql
      //     .updataUserInfo(updateInfo)
      //     .then((res) => {
      //       const data = {
      //         avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      //         name: user.user_id,
      //         // roles: [user.user_admin === 0 ? 'admin' : '']
      //         roles: [user.role_name]
      //       }
      //       ctx.body = ApiErrorNames.getSuccessInfo(data)
      //     })
      //     .catch((error) => {
      //       console.error(error)
      //       ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.DATA_IS_WRONG)
      //     })
      }
    } else {
      ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.INVALID_TOKEN)
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
    ctx.body = ApiErrorNames.getSuccessInfo('退出登陆')
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
    const { username, password } = body
    ctx.body = ApiErrorNames.getSuccessInfo(body)
  } catch (error) {
    if (error.parent.code === 'ER_DUP_ENTRY' && error.parent.errno === 1062) {
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
    ctx.body = ApiErrorNames.getSuccessInfo({
      a: 'bbb'
    })
  } catch (error) {
    ctx.throw(500)
  }
}
