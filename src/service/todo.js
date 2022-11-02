const { Todo } = require('../model/index');
const Redis = require('../../config/redis')

class TodoService {
    async getTodoListByUser(query) {
        // 默认
        if(!query.pageSize) {
            query.pageSize = 10
        }
        if(!query.page) {
            query.page = 1
        }
        return await Todo.findAndCountAll({
            where: {
                userId: query.userId,
            },
            offset: ((parseInt(query.page) || 1) - 1) * parseInt(query.pageSize),
            limit: parseInt(query.pageSize) || 10
        });
    };

    async createTodo(params){
        return Todo.create(params);
    };
    
}

module.exports = new TodoService();