const { insert, select, update, destory } = require('../../pool')
const { Product, ProductImg } = require('../../model/szwego')
const { isEmpty, map, forEach, size, assign, omit, clone } = require('lodash')
const moment = require("moment")
const { Op } = require('sequelize')

const add = async (data) => {
  // console.log(data)
  const { shop_id, goods_id, link, time_stamp, title, imgs, imgsSrc } = data
  const insertData = {
    shop_id,
    category_id: 1,
    goods_id,
    link,
    time_stamp,
    title,
    status: 1
  }
  let prd = {}
  prd = await select(Product, {
    where: {
      goods_id: data.goods_id
    }
  })
  if (isEmpty(prd)) {
    prd = await insert(Product, insertData)
    if (size(imgs) > 0) {
      let i = 0
      while (i < size(imgs)) {
        const imgData = {
          product_id: prd.id,
          img: imgs[i],
          imgSrc: imgsSrc[i]
        }
        await insert(ProductImg, imgData)
        i += 1
      }
    }
  } else {
  }
  return new Promise(resolve => {
    resolve(prd)
  })
}

const edit = async (data) => {
  const {
    id,
    title,
    status
  } = data
  const prd = await update(Product, { status }, {
    where: {
      id
    }
  })
  return new Promise(resolve => {
    resolve(prd)
  })
}

const removeFromShop = async (shop_id) => {
  let products = await select(Product, {
    where: {
      shop_id
    }
  }, true)
  let i = 0
  while (i < size(products)) {
    const prd = products[i]
    await destory(ProductImg, {
      where: {
        product_id: prd.id
      }
    })
  }
  products = await destory(Product, {
    where: {
      shop_id
    }
  })
  return new Promise(resolve => {
    resolve(products)
  })
}

const list = async (data) => {
  const { title, start, end, order } = data
  let currentPage = Number(data.currentPage) || 1
  const limit = Number(data.pageSize) || 50
  let condition = {
    // include: [{
    //   model: ProductImg
    // }],
    // include: [ProductImg],
    limit,
    order: [['time_stamp', order]],
    offset: (currentPage - 1) * limit,
    where: {}
  }
  if (start && end) {
    const s = moment(Number(start)).format()
    const e = moment(Number(end)).format()
    condition.where = assign(condition.where, {
      time_stamp: {
        [Op.between]: [s, e]
      }
    })
  }
  const category_id = Number(data.categoryId) || null
  if (category_id) {
    condition.where = assign(condition.where, {
      category_id
    })
  }

  if (title) {
    condition.where = assign(condition.where, {
      title: {
        [Op.like]: `%${title}%`
      }
    })
  }

  let result = await Product.findAndCountAll(condition)

  let total = result.count
  const { count } = result
  const totalPages = Math.floor(count / limit) + 1
  if (currentPage > totalPages) {
    currentPage = totalPages
    condition.offset = (currentPage - 1) * limit
    result = await Product.findAndCountAll(condition)
  }
  
  const { rows } = result
  let products = []
  let i = 0
  while (i < size(rows)) {
    const row = rows[i]
    const { id, shop_id, category_id, goods_id, link, time_stamp, title, status } = row
    let prd = {
      id,
      shop_id,
      category_id,
      goods_id,
      link,
      time_stamp: moment(time_stamp).format('YYYY-MM-DD hh:mm:ss'),
      title,
      status
    }
    const imgRows = await ProductImg.findAll({
      where: {
        product_id: id
      }
    })
    const imgs = map(imgRows, o => {
      const { img, imgSrc } = o
      return {
        img,
        imgSrc
      }
    })
    prd = assign(prd, { imgs })
    products.push(prd)
    i += 1
  }
  const returnData = {
    total,
    currentPage,
    pageSize: limit,
    products
  }
  return new Promise(resolve => {
    resolve(returnData)
  })
}

module.exports = {
  add,
  edit,
  list,
  removeFromShop
}
