const { sequelize, insert, select, update, destory } = require('../../pool')
const product = require('../../model/szwego/product')
const productImg = require('../../model/szwego/productImg')
const { isEmpty, map, forEach, size, assign, omit, clone } = require('lodash')
const moment = require("moment")
const { Op } = require('sequelize')

const Product = sequelize.define('szwego_product', product, {
  charset: 'utf8mb4'
})

const ProductImg = sequelize.define('szwego_product_img', productImg)


const add = async (data) => {
  // console.log(data)
  const { sid, goods_id, link, time_stamp, title, imgs, imgsSrc } = data
  const insertData = {
    sid,
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
          pid: prd.id,
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

const list = async (data) => {
  const { title, start, end, order } = data
  let currentPage = Number(data.currentPage) || 1
  const limit = Number(data.pageSize) || 50
  let condition = {
    order: [['time_stamp', order]],
    limit,
    offset: (currentPage - 1) * limit,
    where: {}
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
    const { id, sid, category_id, goods_id, link, time_stamp, title, status } = row
    let prd = {
      id,
      sid,
      category_id,
      goods_id,
      link,
      time_stamp: moment(time_stamp).format('YYYY-MM-DD hh:mm:ss'),
      title,
      status
    }
    const imgRows = await select(ProductImg, {
      where: {
        pid: id
      }
    }, true)
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
  Product,
  ProductImg,
  add,
  edit,
  list
}
