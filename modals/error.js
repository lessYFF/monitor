/**
 * error表
 * @param id - 错误id
 * @param type - 错误类型
 * @param info - 错误信息
 * @param description - 错误描述
 * @param record_id - 错误回放信息id
 * @param createAt - 错误纪录创建时间
 * @param updateAt - 错误纪录更新时间
 */

module.exports = (sequelize, Sequelize) => {
    // 错误表
    const Error = sequelize.define('error', {
        type: {
            type: Sequelize.STRING,
        },
        info: {
            type: Sequelize.JSON,
        },
        description: {
            type: Sequelize.STRING,
        },
        record_id: {
            type: Sequelize.STRING,
        },
    })

    return Error;
}