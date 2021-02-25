const szwegoSql = require('../../lib/mysql/szwego') 
const ApiErrorNames = require('../../error/ApiErrorNames')
const { map, assign, find, size } = require('lodash')
const szwegoApi = require('../../lib/szwegoApi')

const syncShopList = async (user_id) => {
  const oldUser = await szwegoSql.user.findUser(user_id)
  const newUser = await szwegoSql.user.updateToken(oldUser)
  const shopList = await szwegoApi.shop.getAlbumList({ token: newUser.token, timestamp: Date.now() })
  let i = 0
    while (i < size(shopList)) {
      const shop_info = shopList[i]
      const { shop_id, shop_name, shop_url, user_icon, new_goods, total_goods } = shop_info
      const sqlData = {
        user_id,
        album_id: shop_id,
        category_id: 1,
        shop_name,
        shop_url,
        user_icon,
        new_goods,
        total_goods
      }
      const shop = await szwegoSql.shop.add(sqlData)
      i += 1
    }
  return new Promise(resolve => {
    resolve(shopList)
  })
} 

/**
 * 获取相册列表
 */
exports.list = async (ctx, next) => {
  const { query } = ctx
  try {
    const { userId } = query
    // await syncShopList(userId)
    let list = await szwegoSql.shop.list({ user_id: userId })
    const categorys = await szwegoSql.category.list()
    list = map(list, (o) => {
      const { category_id, ...rest } = o.toJSON()
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
