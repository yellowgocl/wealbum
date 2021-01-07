const config = require('../../config/szwegoConfig')
const szwegoSql = require('../../lib/mysql/szwego') 
const szwegoApi = require('../../lib/szwegoApi') // 引入szwegoApi
const ApiErrorNames = require('../../error/ApiErrorNames')

/**
 * 增加账户 
 */
exports.add = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const user = await szwegoSql.user.add(body)
    // const szwego = await userApi.login({
    //   phone_number: '17073797630',
    //   password: 'w11221122',
    //   showConfirm: false 
    // })
    console.log(user)
    ctx.body = ApiErrorNames.getSuccessInfo({
      a: 'bbb'
    })
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 删除账户 
 */
exports.remove = async (ctx, next) => {
  const { body } = ctx.request
  try {
    ctx.body = ApiErrorNames.getSuccessInfo({})
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 编辑账户 
 */
exports.edit = async (ctx, next) => {
  const { body } = ctx.request
  try {
    ctx.body = ApiErrorNames.getSuccessInfo({})
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 获取账户列表
 */
exports.list = async (ctx, next) => {
  const { body } = ctx.request
  try {
    ctx.body = ApiErrorNames.getSuccessInfo({})
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 获取账户详情
 */
exports.info = async (ctx, next) => {
  const { body } = ctx.request
  try {
    ctx.body = ApiErrorNames.getSuccessInfo({})
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 普通登录
 */
exports.login = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const user = await userApi.login({
      phone_number: '17073797630',
      password: 'w11221122',
      showConfirm: false 
    })
    // if (!user) {
    //   // ctx.status = 401
    //   ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_NOT_EXIST)
    //   return
    // }
    // if ((await user.user_pwd) === body.password) {
    //   const data = {
    //   }
    //   ctx.body = ApiErrorNames.getSuccessInfo(data)
    // } else {
    //   ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_LOGIN_ERROR)
    // }
    ctx.body = ApiErrorNames.getSuccessInfo(user)
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
    ctx.body = ApiErrorNames.getSuccessInfo()
  } catch (error) {
    ctx.throw(500)
  }
}
