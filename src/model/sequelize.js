const Sequelize = require('sequelize');
const config = require('../../config/dbinfo');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    define: {
        timestamps: true,
    },
    timezone: '+08:00', //东八时区
    pool: {
        max: 5, //最大连接数
        min: 0, //最小连接数
        idle: 10000
    },
});

module.exports = sequelize