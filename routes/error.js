const router = require('koa-router')()
const errorControllers = require('../controllers/error')

router.prefix('/api/error')

// create
router.post('/', errorControllers.create)

// query
router.get('/', errorControllers.findAll)
router.get('/:id', errorControllers.findOne)

// update
router.put('/:id', errorControllers.update)

// delete
router.delete('/', errorControllers.deleteAll)
router.delete('/:id', errorControllers.deleteOne)


module.exports = router