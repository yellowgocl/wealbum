// const mysql = require('mysql2')
const config = require("../config/defaultConfig");
const { Sequelize } = require("sequelize");
const { isArray } = require("lodash");
console.info(config);
const sequelize = new Sequelize(
  config.database.DATABASE,
  config.database.USER,
  config.database.PASSWORD,
  {
    dialect: "mysql", //数据库类型
    host: config.database.HOST, //主机地址
    port: config.database.PORT,
    pool: {
      //连接池设置
      max: 5, //最大连接数
      idle: 30000,
      acquire: 60000,
    },
    dialectOptions: {
      charset: "utf8mb4", //字符集
      collate: "utf8mb4_unicode_ci",
    },
    define: {
      //模型设置
      freezeTableName: true, //自定义表面，不设置会自动将表名转为复数形式
      timestamps: true, //自动生成更新时间、创建时间字段：updatedAt,createdAt
    },
    //
  }
);

const insert = async (tabel, value) => {
  let t = await tabel.create(value);
  return new Promise((resolve, reject) => {
    resolve(t);
  });
};

const select = async (tabel, value) => {
  let t = await tabel.findAll(value);
  if (isArray(t) && t.length > 0) {
    t = t[0]["dataValues"];
  }
  return new Promise((resolve, reject) => {
    resolve(t);
  });
};

const update = async (tabel, value) => {
  let t = await tabel.update(value);
  return new Promise((resolve, reject) => {
    resolve(t);
  });
};

const destory = async (tabel, value) => {
  let t = await tabel.destroy(value);
  return new Promise((resolve, reject) => {
    resolve(t);
  });
};

// test sequelize
// sequelize.authenticate().then(()=>{
//   console.log("数据库已连接！")
// }).catch(err=>{
//   console.log(err)
//   console.log("连接失败")
// })

module.exports = {
  sequelize,
  insert,
  select,
  update,
  destory,
};
