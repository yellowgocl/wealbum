const router = require('koa-router')() //引入路由函数
const szwegoControl = require('../controllers/szwego') //引入逻辑


router.all('/szwego/ws/test', szwegoControl.ws.test)


module.exports = router
