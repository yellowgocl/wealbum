const user = require('./user')
const shop = require('./shop')
const schedule = require('node-schedule')
const szwegoSql = require('../../lib/mysql/szwego')
const szwegoApi = require('../../lib/szwegoApi')
const { map, assign, size, concat } = require('lodash')
const product = require('../../lib/model/szwego/product')
const moment = require('moment')
const ApiErrorNames = require('../../error/ApiErrorNames')

const scheduleCron = {
  // autoSync: '0 0 0 * * 6',
  autoSync: '0 0 0 * * *'
}


const time_zone = 8

let syncStartDate =  '2021-01-01 00:00:00' // 1609430400000
let syncEndDate = '2021-01-10 00:00:00' // 1610208000000

let isSyncing = false

const syncProgress = {
  user: {
    completed: 0,
    total: 0
  },
  shop: {
    completed: 0,
    total: 0
  },
  product: {
    completed: 0,
    total: 0
  }
}

// schedule.scheduleJob(scheduleCron.autoSync, () => {
//   syncShopList()
// })

const resetProgress = () => {
  const { user } = syncProgress
  const { shop } = syncProgress
  const { product } = syncProgress
  user.total = shop.total = product.total = 0
  user.completed = shop.completed = product.completed = 0
}

const syncShopList = async () => {
  if (isSyncing) return
  isSyncing = true
  let ul = await szwegoSql.user.list()
  let i = 0
  let timestamp = Date.now()
  const history = await szwegoSql.sync.addHistory({ timestamp })
  while (i < size(ul)) {
    const user = ul[i]
    const token = user.token
    const user_id = user.id
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
      const option = await szwegoSql.sync.addOption(
        {
          sid: shop.id,
          start_date: syncStartDate,
          end_date: syncEndDate
        }
      )
      const syncShop = await szwegoSql.sync.addSyncShop({
        shid: history.id,
        sid: shop.id
      })
      j += 1
    }
    i += 1
  }
  syncProducts()
}

const syncProducts = async () => {
  const shopList = await getTotalShopList()
  let i = 0
  let productsTotal = 0
  while (i < size(shopList)) {
    const shop = shopList[i]
    const option = await szwegoSql.sync.getOption({ sid: shop.id })
    const pl = await szwegoApi.product.getProductList(assign(shop, {option}), szwegoSql.product.add)
    productsTotal += size(pl)
    i += 1
  }
  console.log(`syncing complete...totalCount: ${productsTotal}`)
  isSyncing = false
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

const customSync = async (ctx, next) => {
  const { query } = ctx
  try {
    syncShopList()
    ctx.body = ApiErrorNames.getSuccessInfo({msg: '同步开始'})
  } catch (error) {
    ctx.throw(500)
  }
  
  // syncProducts()
}
// syncShopList()

module.exports = {
  user,
  shop,
  customSync
}
