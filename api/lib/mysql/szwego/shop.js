const { sequelize, insert, select, update, destory } = require('../../pool')
const shop = require('../../model/szwego/shop')
const userShop = require('../../model/szwego/userShop')
const { isEmpty, map, forEach, assign } = require('lodash')
const { Product } = require('./product')

const Shop = sequelize.define('szwego_shop', shop, {
  charset: 'utf8mb4'
})

const UserShop = sequelize.define('szwego_user_shop', userShop)

const add = async (data) => {
  const { user_id, ...rest } = data
  let shop = {}
  shop = await select(Shop, {
    where: {
      shop_id: rest.shop_id
    }
  })
  if (isEmpty(shop)) {
    shop = await insert(Shop, rest)
    const usData = {
      uid: user_id,
      sid: shop.id
    }
    await insert(UserShop, usData)
    // console.log(insertedItem)
  } else {
    const usItem = await select(UserShop, {
      where: {
        sid: shop.id
      }
    })
    if (isEmpty(usItem)) {
      await insert(UserShop, {
        uid: user_id,
        sid: shop.id
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
  const uid = params.uid || -1
  const sidList = await select(UserShop, {
    where: {
      uid
    }
  })
  const list = []
  let i = 0
  while (i < sidList.length) {
    const o = sidList[i]
    const shop = await select(Shop, {
      where: {
        id: o.sid
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
  const { sid, cid } = params
  await update(Shop, { category_id: cid }, {
    where: {
      id: sid
    }
  })
  await update(Product, { category_id: cid }, {
    where: {
      sid
    }
  })
  const shop = await select(Shop, { where: { id: sid }})
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
