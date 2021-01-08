// 引用 ORM
const Sequelize = require('sequelize');
const sequelize = require('../sequelize')

const Article = sequelize.define('article', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
    paranoid: true,
});

Article.sync({ force: false });

module.exports = Article