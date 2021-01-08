const md5 = require('md5-node')
// 引用 ORM
const Sequelize = require('sequelize');
const sequelize = require('../sequelize')

const Account = sequelize.define('account', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('password', md5(value));
        }
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
    },
},{
    paranoid: true,
});

Account.sync({ force: false });

module.exports = Account