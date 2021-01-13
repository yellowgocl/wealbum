const { sequelize, insert, select, update, destory } = require('../../pool')
const product = require('../../model/szwego/product')
const productImg = require('../../model/szwego/productImg')
const { isEmpty, map, forEach, size } = require('lodash')

const Product = sequelize.define('szwego_product', product, {
  charset: 'utf8mb4'
})

const ProductImg = sequelize.define('szwego_product_img', productImg)

const initTables = async () => {
  await Product.sync()
  await ProductImg.sync()
}

initTables()

const add = async (data) => {
  console.log(data)
  const { sid, goods_id, link, time_stamp, title, imgs, imgsSrc } = data
  const insertData = {
    sid,
    category_id: -1,
    goods_id,
    link,
    time_stamp,
    title
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

module.exports = {
  add
}
