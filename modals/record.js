/**
 * 录播纪录表
 * @param id - id
 * @param error_id - 错误id
 * @param info - 错误回放信息
 * @param createAt - 错误纪录创建时间
 * @param updateAt - 错误纪录更新时间
 */

module.exports = (sequelize, Sequelize) => {
    // 错误表
    const Record = sequelize.define('record', {
        error_id: {
            type: Sequelize.STRING,
        },
        info: {
            type: Sequelize.JSON,
        },
    })

    return Record
}
