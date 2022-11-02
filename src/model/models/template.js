// 引用 ORM
const Sequelize = require('sequelize');
const sequelize = require('../sequelize')

const Template = sequelize.define('template', {
  title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  pageData: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
    paranoid: true,
});

Template.sync({ force: false });

module.exports = Template