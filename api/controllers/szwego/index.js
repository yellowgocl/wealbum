const user = require('./user')
const shop = require('./shop')
const schedule = require('node-schedule')
const moment = require('node-schedule')
const szwegoSql = require('../../lib/mysql/szwego') 
const szwegoApi = require('../../lib/szwegoApi')
const { map, assign } = require('lodash')
const product = require('../../lib/model/szwego/product')

const scheduleCron = {
  // autoSync: '0 0 0 * * 6',
  autoSync: '0 0 * * * *'
}


schedule.scheduleJob(scheduleCron.autoSync, () => {
  const timeStemp = Date.now()
  syncShopList(timeStemp)
})

const syncShopList = async (ts=null) => {
  let ul = await szwegoSql.user.list()
  let timestamp = ts || Date.now()
  ul = map(ul, async o => {
    const sl = await szwegoApi.shop.getAlbumList({token: o.token, timestamp})
    map(sl, async shop_item => {
      const { shop_id, shop_name, shop_url, user_icon, new_goods, total_goods } = shop_item
      const sqlData = {
        user_id: o.id,
        shop_id,
        category_id: -1,
        shop_name,
        shop_url,
        user_icon,
        new_goods,
        total_goods
      }
      const shop = await szwegoSql.shop.add(sqlData)
      const syncProductsParams = {
        sid: shop.id,
        token: o.token,
        shop_id,
        timestamp
      }
      syncProducts (syncProductsParams)
    })
    const u = assign(o, { shop_list: sl })
    return u
  })
}

const syncProducts = async (params) => {
  const { sid, ...rest } = params
  const productList = await szwegoApi.product.getProductList(rest)
  map(productList, async o => {
    await szwegoSql.product.add(assign(o, { sid }))
  })
}

// syncShopList()

module.exports = {
  user,
  shop
}
