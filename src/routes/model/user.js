const router = require('koa-router')
const AccountController = require('../../controller/AccountController');

const userRouter = new router({ prefix: '/user' })
// 登录
// userRouter.post('/login',AccountController.login)
userRouter.post('/login', AccountController.login)
// 创建
userRouter.post('/create', AccountController.create)
// 更新
userRouter.put('/:id', AccountController.update)
// 删除
userRouter.del('/:id', AccountController.del)

module.exports = userRouter