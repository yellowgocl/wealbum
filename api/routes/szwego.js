const router = require('koa-router')() //引入路由函数
const szwegoControl = require('../controllers/szwego') //引入逻辑


router.post('/szwego/user/add', szwegoControl.user.add)
router.post('/szwego/user/remove', szwegoControl.user.remove)
router.post('/szwego/user/edit', szwegoControl.user.edit)
router.get('/szwego/user/list', szwegoControl.user.list)
router.get('/szwego/shop/list', szwegoControl.shop.list)
router.get('/szwego/user/info', szwegoControl.user.info)

module.exports = router
//将页面暴露出去
