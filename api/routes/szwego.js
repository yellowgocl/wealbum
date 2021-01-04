const router = require('koa-router')() //引入路由函数
const szwegoControl = require('../controllers/szwego') //引入逻辑

// router.post('/szwego/logout', szwegoControl.logout)
router.get('/szwego/user/login', szwegoControl.user.login)

module.exports = router
//将页面暴露出去
