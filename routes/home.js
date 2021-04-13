const router = require('koa-router')()

router.get('/', async(ctx, next) => {
    await ctx.render('index', {
        title: 'Monitor Page'
    })
})

module.exports = router