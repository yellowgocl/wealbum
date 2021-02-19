const szwegoSql = require('../../lib/mysql/szwego') 
const ApiErrorNames = require('../../error/ApiErrorNames')

/**
 * 产品列表
 */
exports.list = async (ctx, next) => {
  /**
   * 关键词 title
   * 商铺ID shopId
   * 分类ID categoryId
   * 页脚  currentPage
   * 显示个数 pageSize
   * 起始时间 start
   * 结束时间 end
   */
  // const { body } = ctx.request
  const { query } = ctx
  try {
    const list = await szwegoSql.product.list(query)
    ctx.body = ApiErrorNames.getSuccessInfo(list)
  } catch (error) {
    ctx.throw(500)
  }
}

exports.edit = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const prd = await szwegoSql.product.edit(body)
    ctx.body = ApiErrorNames.getSuccessInfo(prd)
  } catch (error) {
    ctx.throw(500)
  }
}
