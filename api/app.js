const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('koa-jwt')
const convert = require('koa-convert')
const Proxy = require('koa-proxy')
const config = require('./config/defaultConfig.js')
const cors = require('koa2-cors')

// controlers
const users = require('./routes/user')
const szwego = require('./routes/szwego')
const ApiErrorNames = require('./error/ApiErrorNames.js')

// error handler
onerror(app)

// cors
app.use(cors())

app.use(
  Proxy({
    host: 'http://127.0.0.1:3005',
    match: /^\/sync/,
    map: (path) => {
      return path.replace(/^\/sync/, '')
    }
  })
)

// 配置jwt错误返回
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.INVALID_TOKEN)
    } else {
      throw err
    }
  })
})

// Unprotected middleware
app.use((ctx, next) => {
  if (ctx.url.match(/^\/public/)) {
    ctx.body = 'unprotected\n'
  } else {
    return next()
  }
})

// Middleware below this line is only reached if JWT token is valid
app.use(
  jwt({ secret: config.secret, passthrough: true }).unless({
    path: [ /\/register/, /\/user\/login/ ]
  })
)

// middlewares
app.use(
  convert(
    bodyparser({
      enableTypes: [ 'json', 'form', 'text' ]
    })
  )
)
app.use(convert(json()))
app.use(convert(logger()))
app.use(require('koa-static')(`${__dirname}/public`))

app.use(
  views(__dirname + '/views', {
    extension: 'pug'
  })
)

// logger

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(users.routes(), users.allowedMethods())
app.use(szwego.routes(), szwego.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
