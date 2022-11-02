const TodoService = require('../service/todo');
const md5 = require('md5-node')
const jwt = require('jsonwebtoken')
const { verToken } = require('../middleware/jwt')
// parameter
const todoParam = require('./parameter/todo')


class TodoController {
    async getTodoList(ctx) {
        const jwtInfo = await verToken(ctx.request.header.authorization)
        let query = ctx.request.query
        query.userId = jwtInfo._id
        const todoList = await TodoService.getTodoListByUser(query)
        let result = {
            list: todoList.rows,
            total: todoList.count,
            page: parseInt(query.page) || 1,
            pageSize: parseInt(query.pageSize) || 10
        }
        ctx.success(result)
    }

    async create(ctx) {
        // 校验器
        ctx.verifyParams(todoParam.create);
        const jwtInfo = await verToken(ctx.request.header.authorization)
        const params = ctx.request.body
        params.userId = jwtInfo._id
        const todoInfo = await TodoService.createTodo(params)
        ctx.success(todoInfo)
    }
}

module.exports = new TodoController();