/**
 * restful api： Record table crud
 */
const db = require('../../modals')
const Record = db.record
const Op = db.Sequelize.Op

// 查询所有数据
const findAll = async (ctx, next) => {
    const id = ctx.request.query.id
    if (!id) {
        ctx.body = {
            message: 'find error~',
            data: false,
        }
        ctx.status = 500
        return
    }
    await Record.findAll({
        where: { error_id: id },
        attributes: ['info'],
    }).then((data) => {
        ctx.body = data.map(item => {
            return JSON.parse(item.info)
        })
        ctx.status = 200
    })
}

// 删除指定数据
const deleteAll = async (ctx, next) => {
    const id = ctx.request.query.id
    if (!id) {
        ctx.body = {
            message: 'delete error~',
            data: false,
        }
        ctx.status = 500
        return
    }

    await Error.destroy({
        where: { error_id: id },
    }).then((num) => {
        ctx.body = true
        ctx.status = 200
        ctx.message = 'delete successfuly'
    })
}

module.exports = {
    findAll,
    deleteAll
}
