const szwegoSql = require('../../lib/mysql/szwego') 
const ApiErrorNames = require('../../error/ApiErrorNames')

/**
 * 获取相册列表
 */
exports.list = async (ctx, next) => {
  const { query } = ctx
  try {
    const { uid } = query
    const list = await szwegoSql.shop.list({ uid })
    ctx.body = ApiErrorNames.getSuccessInfo(list)
  } catch (error) {
    ctx.throw(500)
  }
}
