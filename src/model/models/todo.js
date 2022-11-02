// 引用 ORM
const Sequelize = require('sequelize');
const sequelize = require('../sequelize')

const TodoList = sequelize.define('todos', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  link: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  expires: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull:false,
    defaultValue: 0,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
    paranoid: true,
});

TodoList.sync({ force: false });

module.exports = TodoList
