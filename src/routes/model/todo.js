const router = require('koa-router')
const TodoController = require('../../controller/TodoController');

const todoRouter = new router({ prefix: '/todo' })
// 登录
// userRouter.post('/login',AccountController.login)
// 创建
todoRouter.post('/create', TodoController.create)
// 更新
// 删除
// 列表
todoRouter.get('/list', TodoController.getTodoList)

module.exports = todoRouter