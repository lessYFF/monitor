const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')

const routes = require('./routes')
const db = require('./modals')
const app = new Koa()

// init database
db.sequelize.sync({ force: true }).then(() => {
  console.log("删除数据库重启");
})

// error handler
onerror(app)

// middlewares
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text'],
}))
app.use(views(__dirname + '/views', {
    extension: 'pug',
}))

// logger-simple
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
Object.values(routes).forEach(route => {
  app.use(route.routes(), route.allowedMethods())
})

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
