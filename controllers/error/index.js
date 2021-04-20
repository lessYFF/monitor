/**
 * restful api： Error table crud
 */
const db = require('../../modals')
const sendEmail = require('./email')
const Error = db.error
const Record = db.record
const Op = db.Sequelize.Op

// 新建一条数据
const create = async (ctx, next) => {
    const res = JSON.parse(ctx.request.body);
    if (!res.info) {
        ctx.body = {
            message: 'create error~',
            data: false,
        }
        ctx.status = 500
        return
    }
    const hasRecord = Array.isArray(res.record);
    const id = Date.now() + Math.ceil(Math.random() * 10000);
    const errroInfo = {
        record_id: hasRecord ? id : undefined,
        description: '-',
        ...res,
    }
    
    await Error.create(errroInfo)

    // 存在回放纪录才存
    if (hasRecord) {
        const recordList = res.record.map((item) => {
            item.info = JSON.parse(JSON.stringify(item))
            item.error_id = id

            return item
        })
        await Record.bulkCreate(recordList)
    }
    //sendEmail({})
    ctx.body = true
    ctx.status = 200
}

// 查询一条数据
const findOne = async (ctx, next) => {
    const id = ctx.request.query.id
    if (!id) {
        ctx.body = {
            message: 'find error~',
            data: false,
        }
        ctx.status = 500
        return
    }
    await Error.findByPk(id).then((data) => {
        ctx.body = data
        ctx.status = 200
    })
}

// 查询所有数据
const findAll = async (ctx, next) => {
    await Error.findAll({
        where: {},
    }).then((data) => {
        ctx.body = data
        ctx.status = 200
    })
}

// 更新指定一条数据
const update = async (ctx, next) => {
    const id = ctx.request.params.id
    if (!id) {
        ctx.body = {
            message: 'find error~',
            data: false,
        }
        ctx.status = 500
        return
    }
    
    await Error.update(ctx.body, {
        where: { id: id },
    }).then(num => {
        if (num === 1) {
            ctx.body = data
            ctx.status = 200
            ctx.message = 'update successfuly'
        } else {
            ctx.body = false
            ctx.status = 500
        }
    })
}

// 删除指定一条数据
const deleteOne = async (ctx, next) => {
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
        where: { id: id },
    }).then(num => {
        if (num === 1) {
            ctx.body = true
            ctx.status = 200
            ctx.message = 'delete successfuly'
        } else {
            ctx.body = false
            ctx.status = 500
        }
    })
}

// 删除指定一条数据
const deleteAll = async (ctx, next) => {
    await Error.destroy({
        where: {},
        truncate: true,
    }).then(num => {
        ctx.body = true
        ctx.status = 200
        ctx.message = 'delete all successfuly'
    })
}

module.exports = {
    create,
    findOne,
    findAll,
    update,
    deleteOne,
    deleteAll,
}
