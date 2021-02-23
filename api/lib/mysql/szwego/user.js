const { insert, select, update, destory } = require('../../pool')
const { User } = require('../../model/szwego')
const szwegoApi = require('../../szwegoApi')
const { Op } = require('sequelize')
const { size, assign } = require('lodash')


const add = async (value) => {
  // { name, password }
  const { username, password } = value
  let insertData = {}
  let result = {}
  const szwego = await szwegoApi.user.login({
    phone_number: username,
    password,
    showConfirm: false 
  })
  if (szwego.errcode === 0) {
    const { shop_id, union_id, shop_name, token } = szwego
    insertData = {
      name: username,
      password,
      album_id: shop_id,
      shop_name,
      union_id,
      token
    }
    result = await insert(User, insertData)
  } else {
    // szwego.errcode === 221
    // szwego.errcode === 12061003
    result = szwego
  }
  return result
}

const remove = async (value) => {
  const { id } = value
  let result = await destory(User, {
    where: {
      id
    }
  })
  return result
}

const list = async () => {
  const userList = await select(User, {}, true)
  return userList
}

const updateToken = async (user) => {
  const { name, password, id } = user
  const szwego = await szwegoApi.user.login({
    phone_number: name,
    password,
    showConfirm: false 
  })
  if (szwego.errcode === 0) {
    const { shop_id, union_id, shop_name, token } = szwego
    const updateData = {
      album_id: shop_id,
      shop_name,
      union_id,
      token
    }
    await update(User, updateData, { where: { id }})
  }
  return new Promise(resolve => {
    resolve(szwego)
  })
}

const findUser = async (id) => {
  let result = await select(User, {
    where: {
      id
    }
  })
  return result
}

module.exports = {
  findUser,
  add,
  remove,
  list,
  updateToken
}
