const { Product, Img } = require('../../model/szwego')
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
  const [prd, created] = await Product.findOrCreate({
    where: {
      goods_id
    },
    defaults: insertData
  })
  let i = 0
  while (i < size(imgs)) {
    const product_id = prd.toJSON().id
    const thumb = imgs[i]
    const src = imgsSrc[i]
    const imgData = {
      product_id,
      thumb,
      src
    }
    await Img.create(imgData)
    i += 1
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
  const prd = await Product.update({ status }, {
    where: {
      id
    }
  })
  return new Promise(resolve => {
    resolve(prd)
  })
}

const removeFromShop = async (shop_id) => {
  let products = await Product.findAll({
    where: {
      shop_id
    }
  })
  
  let i = 0
  while (i < size(products)) {
    const prd = products[i]
    await Img.destory({
      where: {
        product_id: prd.toJSON().id
      }
    })
  }
  products = await Product.destory({
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
  // console.log(result)
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
    const { id, shop_id, category_id, goods_id, link, time_stamp, title, status } = row.toJSON()
    const imgs = await row.getImgs().then(res => {
      return map(res, o => {
        const { thumb, src } = o.toJSON()
        return { thumb, src }
      })
    })
    let prd = {
      id,
      shop_id,
      category_id,
      goods_id,
      link,
      time_stamp: moment(time_stamp).format('YYYY-MM-DD hh:mm:ss'),
      title,
      status,
      imgs
    }
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
