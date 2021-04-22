const router = require('koa-router')()

// 配置页面列表
const pageList = [
    {
        path: '/', // 首页
        name: 'index',
        title: '首页',
    },
    {
        path: '/errorPage', // 异常列表页
        name: 'error',
        title: '异常列表页',
    },
    {
        path: '/performancePage', // 性能监控页
        name: 'performance',
        title: '性能监控页',
    },
    {
        path: '/replayPage', // 错误回放页
        name: 'replay',
        title: '错误回放页',
    },
    {
        path: '/resolvePage', // 错误回放页
        name: 'resolve',
        title: '错误排查页',
    },
]

// 公共渲染页面方法
const renderPage = (args) => {
    if (!Array.isArray(args)) args = [args]
        
    args.forEach(obj => {
        const { path, name, title, options } = obj
        router.get(path, async (ctx, next) => {
            await ctx.render(name, {
                title,
                ...options,
            })
        })
    })
}

renderPage(pageList)

module.exports = router