const { User } = require('../../model/szwego')
const szwegoApi = require('../../szwegoApi')
const { Op } = require('sequelize')
const { size, assign, isEmpty, map } = require('lodash')


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
    insertData
    result = await User.findOrCreate({
      where: {
        album_id: shop_id
      },
      defaults: insertData
    }).then(res => {
      const [user, created] = res
      return user
    })
  } else {
    // szwego.errcode === 221
    // szwego.errcode === 12061003
    result = szwego
  }
  return new Promise(resolve => {
    resolve(result)
  })
}

const remove = async (value) => {
  const { id } = value
  await User.destory({
    where: {
      id
    }
  })
  return new Promise(resolve => {
    resolve(value)
  })
}

const list = async () => {
  const userList = await User.findAll()
  return new Promise(resolve => {
    resolve(userList)
  })
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
    await User.update(updateData, { where: { id }})
  }
  return new Promise(resolve => {
    resolve(szwego)
  })
}

const findUser = async (id) => {
  let user = await User.findOne({
    where: {
      id
    }
  })
  return new Promise(resolve => {
    resolve(user)
  })
}

module.exports = {
  findUser,
  add,
  remove,
  list,
  updateToken
}
