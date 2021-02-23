const { insert, select, update, destory } = require('../../pool')
const { ProductStatus } = require('../../model/szwego')

const add = async (data) => {
  const { name } = data
  const insertData = {
    name
  }
  const status = await insert(ProductStatus, insertData)
  return new Promise(resolve => {
    resolve(status)
  })
}

const remove = async (data) => {
  const { id } = data
  const result = await destory(ProductStatus, {
    where: {
      id
    }
  })
  return new Promise(resolve => {
    resolve(result)
  })
}

const edit = async (data) => {
  const { id, name } = data
  await update(ProductStatus, { name }, {
    where: {
      id
    }
  })
  const productStatus = await select(ProductStatus, { where: { id }})
  return new Promise(resolve => {
    resolve(productStatus)
  })
}

const list = async () => {
  let list = await select(ProductStatus, {}, true)
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
