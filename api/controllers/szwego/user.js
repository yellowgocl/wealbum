const config = require('../../config/szwegoConfig')
const userApi = require('../../lib/szwego/userApi') // 引入数据库方法
const ApiErrorNames = require('../../error/ApiErrorNames')

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
