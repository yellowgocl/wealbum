const { sequelize, insert, select, update, destory } = require('../../pool')
const { user } = require('../../model/szwego')
const szwgoApi = require('../../szwegoApi')
const { Op } = require('sequelize')

const User = sequelize.define('szwego_user', user) // 用户表

const initTables = async () => {
  await User.sync()
}

initTables()

const add = async (value) => {
  // { name, password }
  const { username, password } = value
  let result = await insert(User, {
    name: username,
    password
  })
  const szwego = await szwgoApi.user.login({
    phone_number: username,
    password,
    showConfirm: false 
  })
  console.log(szwego)
  return result
}

const findUser = async (name) => {
  let result = await select(User, {
    where: {
      name
    }
  })
  return result
}

module.exports = {
  // 暴露方法
  findUser,
  add
}
