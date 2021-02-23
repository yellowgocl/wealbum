const { insert, select, update, destory } = require('../../pool')
const { Category, Shop, Product } = require('../../model/szwego')

const add = async (data) => {
  // console.log(data)
  const { name } = data
  const insertData = {
    name
  }
  const result = await insert(Category, insertData)
  return new Promise(resolve => {
    resolve(result)
  })
}

const remove = async (data) => {
  const { id } = data
  let cat = {}
  if (id > 1) {
    const shop = await update(Shop, { category_id: 1 }, { where: { category_id: id } })
    const product = await update(Product, { category_id: 1 }, { where: { category_id: id } })
    cat = await destory(Category, {
      where: {
        id
      }
    })
  }
  return new Promise(resolve => {
    resolve(cat)
  })
}

const edit = async (data) => {
  console.log('categoryEdit:', data)
  return new Promise(resolve => {
    resolve({})
  })
}

const list = async () => {
  let list = await select(Category, {}, true)
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
