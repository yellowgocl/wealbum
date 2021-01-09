const user = require('./user')
const shop = require('./shop')
const schedule = require('node-schedule')
const moment = require('node-schedule')
const szwegoSql = require('../../lib/mysql/szwego') 
const { map, assign } = require('lodash')

const scheduleCron = {
  // autoSync: '0 0 0 * * 6',
  autoSync: '0 0/1 * * * ?'
}


// schedule.scheduleJob(scheduleCron.autoSync, () => {
//   const timeStemp = Date.now()
//   syncShopList(timeStemp)
//   // console.log(Date.now())
// })

const syncShopList = async (timestamp) => {
  let ul = await szwegoSql.user.list()
  ul = map(ul, async o => {
    const sl = await szwegoSql.shop.list(assign(o, {timestamp}))
    map(sl, async shop_item => {
      const { shop_id, shop_name, shop_url, user_icon, new_goods, total_goods } = shop_item
      const sqlData = {
        parrent_id: o.id,
        shop_id,
        category_id: -1,
        shop_name,
        shop_url,
        user_icon,
        new_goods,
        total_goods
      }
      await szwegoSql.shop.add(sqlData)
    })
    const u = assign(o, { shop_list: sl })
    return u
  })
  // console.log(ul)
}

syncShopList(Date.now())

module.exports = {
  user,
  shop
}
