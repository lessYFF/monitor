module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'monitor',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 1000, // 释放链接前最大空闲时长
        acquire: 30000, // 抛出异常前重试最大时长
    },
}