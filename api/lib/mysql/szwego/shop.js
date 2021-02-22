const { sequelize, insert, select, update, destory } = require('../../pool')
const shop = require('../../model/szwego/shop')
const userShop = require('../../model/szwego/userShop')
const { isEmpty, map, forEach, assign } = require('lodash')
const { Product } = require('./product')
const modelConfig = require('../../../config/modelConfig')

const Shop = sequelize.define('s_shop', shop, assign(modelConfig, {charset: 'utf8mb4'}))

const UserShop = sequelize.define('s_user_shop', userShop, modelConfig)

const add = async (data) => {
  const { user_id, ...rest } = data
  let shop = {}
  shop = await select(Shop, {
    where: {
      album_id: rest.album_id
    }
  })
  if (isEmpty(shop)) {
    shop = await insert(Shop, rest)
    const usData = {
      user_id,
      shop_id: shop.id
    }
    await insert(UserShop, usData)
    // console.log(insertedItem)
  } else {
    const usItem = await select(UserShop, {
      where: {
        shop_id: shop.id
      }
    })
    if (isEmpty(usItem)) {
      await insert(UserShop, {
        user_id,
        shop_id: shop.id
      })
    } else {
      await update(Shop, rest, {
        where: {
          id: shop.id
        }
      })
    }
  }
  // return shop
  return new Promise(resolve => {
    resolve(shop)
  })
}

const list = async (params) => {
  const user_id = params.user_id || -1
  const sidList = await select(UserShop, {
    where: {
      user_id
    }
  })
  const list = []
  let i = 0
  while (i < sidList.length) {
    const o = sidList[i]
    const shop = await select(Shop, {
      where: {
        id: o.shop_id
      }
    })
    list.push(shop)
    i += 1
  }
  return new Promise(resolve => {
    resolve(list)
  })
}

const edit = async (params) => {
  console.log(params)
  const { shop_id, category_id } = params
  await update(Shop, { category_id }, {
    where: {
      id: shop_id
    }
  })
  await update(Product, { category_id }, {
    where: {
      shop_id
    }
  })
  const shop = await select(Shop, { where: { id: shop_id }})
  return new Promise(resolve => {
    resolve(shop)
  })
}

module.exports = {
  Shop,
  UserShop,
  add,
  list,
  edit
}
