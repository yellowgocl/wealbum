// const mysql = require('mysql2')
const { isEmpty, map, size} = require('lodash')

const insert = async (tabel, value) => {
  let t = await tabel.create(value)
  return new Promise((resolve, reject) => {
    resolve(t['dataValues'])
  })
}

const select = async (tabel, value, isList = false) => {
  let t = await tabel.findAll(value)
  if (!isEmpty(t)) {
    t = map(t, o => {
      return o['dataValues']
    })
  }
  t = size(t) === 1 && !isList ? t[0] : t
  return new Promise((resolve, reject) => {
    resolve(t)
  })
}

const update = async (tabel, value, condition) => {
  let t = await tabel.update(value, condition)
  return new Promise((resolve, reject) => {
    resolve(t)
  })
}

const destory = async (tabel, value) => {
  let t = await tabel.destroy(value)
  return new Promise((resolve, reject) => {
    resolve(t)
  })
}

// test sequelize
// sequelize.authenticate().then(()=>{
//   console.log("数据库已连接！")
// }).catch(err=>{
//   console.log(err)
//   console.log("连接失败")
// })

module.exports = {
  insert,
  select,
  update,
  destory
}
