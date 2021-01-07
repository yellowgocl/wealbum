const router = require('koa-router')() //引入路由函数
const userControl = require('../controllers/user') //引入逻辑

router.get('/', async (ctx, next) => {
	'use strict'
	ctx.redirect('/user/login')
})
// 路由中间间，页面路由到／，就是端口号的时候，（网址），页面指引到／/user/login

router.get('/user/info', userControl.info)
router.post('/user/logout', userControl.logout)
router.post('/user/login', userControl.login)
router.post('/user/add', userControl.add)
router.post('/user/remove', userControl.remove)
// router.post('/user/edit', userControl.edit)
// router.get('/user/list', userControl.list)

module.exports = router
//将页面暴露出去
