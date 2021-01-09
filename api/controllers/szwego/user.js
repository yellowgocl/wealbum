const config = require('../../config/szwegoConfig')
const szwegoSql = require('../../lib/mysql/szwego') 
const ApiErrorNames = require('../../error/ApiErrorNames')

/**
 * 增加账户 
 */
exports.add = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const user = await szwegoSql.user.add(body)
    ctx.body = ApiErrorNames.getSuccessInfo(user)
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
    const user = await szwegoSql.user.remove(body)
    ctx.body = ApiErrorNames.getSuccessInfo(user)
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
    const list = await szwegoSql.user.list()
    ctx.body = ApiErrorNames.getSuccessInfo(list)
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
