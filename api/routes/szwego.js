const router = require('koa-router')() //引入路由函数
const szwegoControl = require('../controllers/szwego') //引入逻辑

// user
router.post('/szwego/user/add', szwegoControl.user.add)
router.post('/szwego/user/remove', szwegoControl.user.remove)
router.post('/szwego/user/edit', szwegoControl.user.edit)
router.get('/szwego/user/list', szwegoControl.user.list)
router.get('/szwego/user/info', szwegoControl.user.info)

// shop
router.get('/szwego/shop/list', szwegoControl.shop.list)
router.post('/szwego/shop/edit', szwegoControl.shop.edit)
// router.get('/szwego/shop/info', szwegoControl.shop.info)

// category
router.post('/szwego/category/add', szwegoControl.category.add)
router.post('/szwego/category/remove', szwegoControl.category.remove)
// router.post('/szwego/category/edit', szwegoControl.category.edit)
router.get('/szwego/category/list', szwegoControl.category.list)

// product
router.post('/szwego/product/edit', szwegoControl.product.edit)
router.get('/szwego/product/list', szwegoControl.product.list)
router.post('/szwego/product/download', szwegoControl.product.download)

// productStatus
router.post('/szwego/status/add', szwegoControl.status.add)
router.post('/szwego/status/remove', szwegoControl.status.remove)
router.post('/szwego/status/edit', szwegoControl.status.edit)
router.get('/szwego/status/list', szwegoControl.status.list)

// test
router.get('/szwego/sync', szwegoControl.sync)
router.get('/szwego/progress', szwegoControl.progress)


module.exports = router
//将页面暴露出去
