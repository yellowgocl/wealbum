const { Status } = require('../../model/szwego')
const { map } = require('lodash')

const add = async (data) => {
  const { name } = data
  const insertData = {
    name
  }
  const status = await Status.create(insertData)
  return new Promise(resolve => {
    resolve(status.toJSON())
  })
}

const remove = async (data) => {
  const { id } = data
  const result = await Status.destory({
    where: {
      id
    }
  })
  return new Promise(resolve => {
    resolve(result.toJSON())
  })
}

const edit = async (data) => {
  const { id, name } = data
  const status=await Status.update({ name }, {
    where: {
      id
    }
  })
  return new Promise(resolve => {
    resolve(status.toJSON())
  })
}

const list = async () => {
  let list = await Status.findAll()
  return new Promise(resolve => {
    resolve(map(list, o => { return o.toJSON() }))
  })
}

module.exports = {
  add,
  remove,
  edit,
  list
}
