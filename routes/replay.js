const router = require('koa-router')()
const recordControllers = require('../controllers/record')

router.prefix('/api/replay')

// query
router.get('/', recordControllers.findAll)


// delete
router.delete('/', recordControllers.deleteAll)

module.exports = router
