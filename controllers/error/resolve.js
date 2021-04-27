/**
 * error resolve controllers
 */
const sourceMap = require('source-map')
const fs = require('fs')
const path = require('path')

const resolve = file => path.resolve(__dirname, file)

// 上传打包sourceMap
const uploadSourceMap = async(ctx, next) => {
    let result = ''
    const file = ctx.request.files.file
    const error = JSON.parse(JSON.parse(ctx.request.query.error))

    if (file) {
        // 解析sourceMap
        const consumer = await new sourceMap.SourceMapConsumer(fs.readFileSync(file.path, 'utf8'))
        // 解析原始报错数据
        result = consumer.originalPositionFor({
            line: error.lineNo, // 压缩后的行号
            column: error.colNo, // 压缩后的列号
        })
        // 1分钟后清空上传文件
        setTimeout(() => {
            // fs.rmdirSync(resolve('../../public/uploads'))
            // fs.mkdirSync(resolve('../../public/uploads'))
        }, 60000)
    }
    ctx.body = result
}

// 清空上传的sourceMap
const clearUploadSourceMap = async (ctx, next) => {
    fs.rmdirSync(resolve('../../public/uploads'))
    fs.mkdirSync(resolve('../../public/uploads'))
    ctx.body = true
}

module.exports = {
    uploadSourceMap,
    clearUploadSourceMap,
}
