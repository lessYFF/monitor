const Koa = require('koa')
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const body = require('koa-body')
const logger = require('koa-logger')
const onerror = require('koa-onerror')

const routes = require('./routes')
const db = require('./modals')
const app = new Koa()

// init database
db.sequelize.sync({ force: false }).then(() => {
  console.log("删除数据库重启");
})

// error handler
onerror(app)

// middlewares
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
    extension: 'pug',
}))
app.use(
    body({
        multipart: true, // 支持文件格式
        formidable: {
            keepExtensions: true, // 保留文件扩展名
            uploadDir: path.join(__dirname, 'public/uploads'), // 上传目录
        },
    })
)

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
