const szwegoSql = require('../../lib/mysql/szwego') 
const ApiErrorNames = require('../../error/ApiErrorNames')

/**
 * 增加状态
 */
exports.add = async (ctx, next) => {
  const { body } = ctx.request
  console.log(body)
  try {
    const result = await szwegoSql.status.add(body)
    ctx.body = ApiErrorNames.getSuccessInfo(result)
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 删除状态
 */
exports.remove = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const result = await szwegoSql.status.remove(body)
    ctx.body = ApiErrorNames.getSuccessInfo(result)
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 编辑状态 
 */
exports.edit = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const result = await szwegoSql.status.edit(body)
    ctx.body = ApiErrorNames.getSuccessInfo(result)
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 获取状态列表
 */
exports.list = async (ctx, next) => {
  const { query } = ctx.request
  try {
    const result = await szwegoSql.status.list()
    ctx.body = ApiErrorNames.getSuccessInfo(result)
  } catch (error) {
    ctx.throw(500)
  }
}
