const Sequelize = require('sequelize')
const dbConfig = require('../config/db')

// 连接数据库
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: dbConfig.pool,
})
const db = {
    sequelize,
    Sequelize,
}

db.error = require('./error')(sequelize, Sequelize)
db.record = require('./record')(sequelize, Sequelize)

module.exports = db;

