const user = require('./user')
const shop = require('./shop')
const schedule = require('node-schedule')
const moment = require('node-schedule')
const szwegoSql = require('../../lib/mysql/szwego')
const szwegoApi = require('../../lib/szwegoApi')
const { map, assign, size, concat } = require('lodash')
const product = require('../../lib/model/szwego/product')

const scheduleCron = {
  // autoSync: '0 0 0 * * 6',
  autoSync: '0 0 * * * *'
}

let isSyncing = false

const syncProgress = {
  users: {
    completed: 0,
    total: 0,
    shops: {
      completed: 0,
      total: 0,
      products: {
        completed: 0,
        total: 0
      }
    }
  }
}

schedule.scheduleJob(scheduleCron.autoSync, () => {
  syncShopList()
})

const resetProgress = () => {
  const { users } = syncProgress
  const { shops } = users
  const { products } = shops
  users.total = shops.total = products.total = 0
  users.completed = shops.completed = products.completed = 0
}

const syncShopList = async () => {
  if (isSyncing) return
  isSyncing = true
  let ul = await szwegoSql.user.list()
  let i = 0
  while (i < size(ul)) {
    const user = ul[i]
    const token = user.token
    const user_id = user.id
    let timestamp = Date.now()
    const sl = await szwegoApi.shop.getAlbumList({ token, timestamp })
    let j = 0
    while (j < size(sl)) {
      const shop_info = sl[j]
      const { shop_id, shop_name, shop_url, user_icon, new_goods, total_goods } = shop_info
      const sqlData = {
        user_id,
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
        token,
        shop_id,
        timestamp
      }
      j += 1
    }
    i += 1
  }
  syncProducts()
}

const syncProducts = async () => {
  const shopList = await getTotalShopList()
  syncProgress.users.shops.total = size(shopList)
  let i = 0
  let productsTotal = 0
  while (i < size(shopList)) {
    const pl = await szwegoApi.product.getProductList(shopList[i], szwegoSql.product.add)
    productsTotal += size(pl)
    i += 1
  }
  console.log(`syncing complete...totalCount: ${productsTotal}`)
  isSyncing = false
  // const { sid, ...rest } = params
  // const pl = await szwegoApi.product.getProductList(rest)
  // syncProgress.users.shops.products.total = size(pl)
  // let i = 0
  // while (i < size(pl)) {
  //   const product_info = pl[i]
  //   console.log(`syncProductBegin: product_id ${product_info.goods.id}, ${Math.ceil((syncProgress.users.shops.products.completed/syncProgress.users.shops.products.total)*100)}%`)
  //   const product = await szwegoSql.product.add(assign(product_info, { sid }))
  //   i += 1
  // }
  // console.log(`syncProductCompleted......`)
}

const getTotalShopList = async () => {
  let ul = await szwegoSql.user.list()
  let sl = []
  let i = 0
  while (i < size(ul)) {
    const user = ul[i]
    let list = await szwegoSql.shop.list({ uid: user.id })
    list = map(list, (o) => {
      return assign(o, { token: user.token })
    })
    sl = concat(sl, list)
    i += 1
  }
  return new Promise((resolve) => {
    resolve(sl)
  })
}

const customSync = async (params) => {
  syncShopList()
}
// syncShopList()

module.exports = {
  user,
  shop,
  customSync
}
