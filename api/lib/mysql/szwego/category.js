const { sequelize, insert, select, update, destory } = require('../../pool')
const category = require('../../model/szwego/category')

const Category = sequelize.define('szwego_category', category)

const add = async (data) => {
  // console.log(data)
  const { name } = data
  const insertData = {
    name
  }
  const cat = await insert(Category, insertData)
  return new Promise(resolve => {
    resolve(cat)
  })
}

module.exports = {
  Category,
  add
}
