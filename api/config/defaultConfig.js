//defaultConfig.js

const envconfig = {
  path: `${process.env.NODE_ENV}.env`
}
const dotenv = require('dotenv').config(envconfig)

// 数据库配置
const config = {
  port: 3000,
  database: {
    DATABASE: process.env.DATABASE, //数据库
    USER: process.env.DB_USER, //用户
    PASSWORD: process.env.DB_PASSWORD, //密码
    PORT: process.env.DB_PORT, //端口
    HOST: process.env.DB_HOST //服务ip地址
  },
  secret: 'jwt_secret'
}

module.exports = config
