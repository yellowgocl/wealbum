const router = require('koa-router')() //引入路由函数
const szwegoControl = require('../controllers/szwego') //引入逻辑


router.post('/szwego/user/add', szwegoControl.user.add)
router.get('/szwego/user/remove', szwegoControl.user.remove)
router.get('/szwego/user/edit', szwegoControl.user.edit)
router.get('/szwego/user/list', szwegoControl.user.list)
router.get('/szwego/user/info', szwegoControl.user.info)
router.post('/szwego/user/logout', szwegoControl.user.logout)
router.get('/szwego/user/login', szwegoControl.user.login)

module.exports = router
//将页面暴露出去
