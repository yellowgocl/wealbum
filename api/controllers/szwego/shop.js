const szwegoSql = require('../../lib/mysql/szwego') 
const ApiErrorNames = require('../../error/ApiErrorNames')
const { map, assign, find } = require('lodash')

/**
 * 获取相册列表
 */
exports.list = async (ctx, next) => {
  const { query } = ctx
  try {
    const { uid } = query
    let list = await szwegoSql.shop.list({ uid })
    const categoryList = await szwegoSql.category.list()
    list = map(list, (o) => {
      const categorys = map(categoryList, item => {
        const { createdAt, updatedAt, ...rest } =item
        return rest
      })
      const { createdAt, updatedAt, category_id, ...rest } = o
      const category = find(categorys, c => {
        return category_id === c.id
      })
      let data = assign(rest, { categorys }, { category })
      return data
    })
    ctx.body = ApiErrorNames.getSuccessInfo(list)
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 修改商铺分类 
 */
exports.edit = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const shop = await szwegoSql.shop.edit(body)
    // const category = {}
    ctx.body = ApiErrorNames.getSuccessInfo(shop)
  } catch (error) {
    ctx.throw(500)
  }
}
