const szwegoSql = require('../../lib/mysql/szwego')
const szwegoApi = require('../../lib/szwegoApi')
const ApiErrorNames = require('../../error/ApiErrorNames')
const { size } = require('lodash')

/**
 * 增加账户 
 */
exports.add = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const nowtime = Date.now()
    const user = await szwegoSql.user.add(body)
    if (!user.errcode || user.errcode === 0) {
      const { token, id } = user.toJSON()
      const sl = await szwegoApi.shop.getAlbumList({ token, timestamp: nowtime })
      let i = 0
      while (i < size(sl)) {
        const shop_info = sl[i]
        const { shop_id, shop_name, shop_url, user_icon, new_goods, total_goods } = shop_info
        const sqlData = {
          user_id: id,
          album_id: shop_id,
          category_id: 1,
          shop_name,
          shop_url,
          user_icon,
          new_goods,
          total_goods
        }
        const shop = await szwegoSql.shop.add(sqlData)
        // console.log(shop)
        i += 1
      }
    }
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
    console.log(body)
    const user_id = body.id
    await szwegoSql.shop.removeFromUser(user_id)
    // const sl = await szwegoSql.shop.list({ user_id })
    // let i = 0
    // while (i < size(sl)) {
    //   const shop = sl[i]
    //   const shop_id = shop.id
    //   await szwegoSql.product.removeFromShop(shop_id)
    //   i += 1
    // }
    // const user = await szwegoSql.user.remove(body)
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
