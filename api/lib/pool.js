const mysql = require('mysql2')
const config = require('../config/defaultConfig')
const { Sequelize, DataTypes } = require('sequelize')
const { user } = require('./model/user')

const poolConfig = {
  host: config.database.HOST,
  user: config.database.USER,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
}

const sequelize = new Sequelize(config.database.DATABASE, config.database.USER, config.database.PASSWORD, {
  dialect: 'mysql',    //数据库类型
  host: config.database.HOST,   //主机地址
  port: config.database.PORT,
  pool: {      //连接池设置
      max: 5,  //最大连接数
      idle: 30000,
      acquire: 60000
  },
  dialectOptions:{
      charset:'utf8mb4',  //字符集
      collate:'utf8mb4_unicode_ci'
  },
  define: {   //模型设置
      freezeTableName:true,    //自定义表面，不设置会自动将表名转为复数形式
      timestamps:true    //自动生成更新时间、创建时间字段：updatedAt,createdAt
  }
  //
})

const User = sequelize.define('user', user)

sync = async () => {
  await sequelize.sync({ force: true })
}

sync()

// test sequelize
// sequelize.authenticate().then(()=>{
//   console.log("数据库已连接！")
// }).catch(err=>{
//   console.log(err)
//   console.log("连接失败")
// })

const pool = mysql.createPool(poolConfig)

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      // console.log(err)
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

const createTable = (sql) => {
  return query(sql, [])
}

module.exports = {
  query,
  sequelize,
  User,
  createTable
}
