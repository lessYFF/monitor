const router = require('koa-router')()

router.prefix('/error')

// 临时存储数据;
let stempData= {
    test: 123
};
router.get('/', async (ctx, next) => {
    await ctx.render('playback', {
        title: 'error page!',
    })
})

router.post('/report', (ctx, next) => {
    stempData = ctx.request.body
    ctx.body = 'true'
})

router.get('/play', async (ctx, next) => {
    ctx.body = stempData
})

module.exports = router