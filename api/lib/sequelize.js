const config = require('../config/defaultConfig')
const { Sequelize } = require('sequelize')

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
      timestamps:false    //自动生成更新时间、创建时间字段：updatedAt,createdAt
  },
  timezone: '+08:00'
  //
})

module.exports = sequelize
