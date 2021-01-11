const { sequelize, insert, select, update, destory } = require('../../pool')
const user = require('../../model/szwego/user')
const szwegoApi = require('../../szwegoApi')
const { Op } = require('sequelize')

const User = sequelize.define('szwego_user', user) // 用户表

const initTables = async () => {
  await User.sync()
}

initTables()

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
      shop_id,
      shop_name,
      union_id,
      token
    }
    result = await insert(User, insertData)
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
  let result = await select(User, {}, true)
  return result
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
  // 暴露方法
  findUser,
  add,
  remove,
  list
}
