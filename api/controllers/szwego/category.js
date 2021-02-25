const szwegoSql = require('../../lib/mysql/szwego') 
const ApiErrorNames = require('../../error/ApiErrorNames')

/**
 * 增加分类 
 */
exports.add = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const category = await szwegoSql.category.add(body)
    // const category = {}
    ctx.body = ApiErrorNames.getSuccessInfo(category.toJSON())
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 删除分类 
 */
exports.remove = async (ctx, next) => {
  const { body } = ctx.request
  try {
    await szwegoSql.category.remove(body)
    ctx.body = ApiErrorNames.getSuccessInfo('删除成功')
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 分类列表
 */
exports.list = async (ctx, next) => {
  // const { body } = ctx.request
  try {
    let category = await szwegoSql.category.list()
    ctx.body = ApiErrorNames.getSuccessInfo(category)
  } catch (error) {
    ctx.throw(500)
  }
}
