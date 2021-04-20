const router = require('koa-router')()

router.get('/', async(ctx, next) => {
    await ctx.render('index', {
        title: 'Monitor Page'
    })
})

router.get('/errorPage', async (ctx, next) => {
    await ctx.render('error', {
        title: '异常列表页',
    })
})

router.get('/performancePage', async (ctx, next) => {
    await ctx.render('performance', {
        title: '性能监控页',
    })
})

router.get('/replayPage', async (ctx, next) => {
    await ctx.render('replay', {
        title: '错误回放页',
    })
})

module.exports = router