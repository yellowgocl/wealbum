const { sequelize, insert, select, update, destory } = require('../../pool')
const shop = require('../../model/szwego/shop')
const szwegoApi = require('../../szwegoApi')
const userSql = require('./user')
const { isEmpty, map } = require('lodash')

const Shop = sequelize.define('szwego_shop', shop, {
  charset: 'utf8mb4'
}) 

const initTables = async () => {
  await Shop.sync()
}

initTables()

const add = async (data) => {
  const item = await select(Shop, {
    where: {
      parrent_id: data.parrent_id,
      shop_id: data.shop_id
    }
  })
  if (isEmpty(item)) {
    await insert(Shop, data)
  } else {
  }
}

const list = async (params) => {
  const id = params.id || -1
  const timestamp = params.timestamp || Date.now()
  const user = await userSql.findUser(id)
  let token = ''
  if (user) {
    token = user.token
  }
  const list = await szwegoApi.shop.getAlbumList({token, timestamp})
  let result = list
  return result
}

module.exports = {
  add,
  list
}
