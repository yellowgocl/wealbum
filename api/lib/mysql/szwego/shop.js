const { Shop, UserShop, Product } = require('../../model/szwego')
const { isEmpty, map, forEach, assign, size } = require('lodash')
const { Op } = require("sequelize")

const add = async (data) => {
  const { user_id, ...rest } = data
  const [s_shop, created] = await Shop.findOrCreate({
    where: {
      album_id: rest.album_id
    },
    defaults: rest
  })
  let shop = s_shop
  if (!created) {
    await Shop.update(rest, {
      where: {
        album_id: rest.album_id
      }
    })
    shop = await Shop.findAll({
      where: {
        album_id: rest.album_id
      }
    }).then(res => {
      const [s] = res
      return s
    })
  } else {

  }
  const shop_id = shop.toJSON().id
  await UserShop.findOrCreate({
    where: {
      [Op.and]: [{ user_id }, { shop_id }]
    },
    defaults: {
      user_id,
      shop_id
    }
  })
  return new Promise(resolve => {
    resolve(shop)
  })
}

const list = async (params) => {
  const user_id = params.user_id || -1
  let sidList = await UserShop.findAll({
    where: {
      user_id
    }
  })
  const list = []
  let i = 0
  while (i < size(sidList)) {
    const o = sidList[i].toJSON()
    const shop = await Shop.findOne({
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
  await Shop.update({ category_id }, {
    where: {
      id: shop_id
    }
  })
  await Product.update({ category_id }, {
    where: {
      shop_id
    }
  })
  const shop = await Shop.findOne({ where: { id: shop_id }})
  return new Promise(resolve => {
    resolve(shop)
  })
}

const removeFromUser = async (user_id) => {
  console.log(user_id)
  const include = [{
    model: Shop,
    as: 'shop'
   }]
  await UserShop.findAll({
    include,
    raw:true
  }).then(res => {
    console.log('succes:', res)
  }).catch(err => {
    console.error('error:', err)
  })
  return new Promise(resolve => {
    resolve([])
  })
}

module.exports = {
  add,
  list,
  edit,
  removeFromUser
}
