const router = require('koa-router')()
const resolveControllers = require('../controllers/error/resolve')

router.prefix('/api/resolve')

router.post('/upload', resolveControllers.uploadSourceMap)

router.delete('/clear', resolveControllers.clearUploadSourceMap)

module.exports = router
