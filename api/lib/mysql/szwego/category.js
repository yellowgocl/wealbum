const { Category, Shop, Product } = require('../../model/szwego')
const { map } = require('lodash')

const add = async (data) => {
  // console.log(data)
  const { name } = data
  const category = await Category.create({ name })
  return new Promise(resolve => {
    resolve(category)
  })
}

const remove = async (data) => {
  const { id } = data
  
  if (id > 1) {
    console.log(id)
    await Shop.update({ category_id: 1 }, { where: { category_id: id } })
    await Product.update({ category_id: 1 }, { where: { category_id: id } })
    await Category.destroy({
      where: {
        id
      }
    })
  }
  return new Promise(resolve => {
    resolve(data)
  })
}

const edit = async (data) => {
  console.log('categoryEdit:', data)
  const { id, ...rest } = data
  const category = Category.update(rest, {
    where: {
      id
    }
  })
  return new Promise(resolve => {
    resolve(category)
  })
}

const list = async () => {
  let list = await Category.findAll()
  return new Promise(resolve => {
    resolve(list)
  })
}

module.exports = {
  add,
  remove,
  edit,
  list
}
