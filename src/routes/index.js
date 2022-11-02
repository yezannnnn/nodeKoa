const router = require('koa-router')()
// models
const userRouter = require('./model/user');
const todoRouter = require('./model/todo');
const templateRouter = require('./model/template');

var routerArry = [
	userRouter,
	todoRouter,
	templateRouter
]

routerArry.forEach((item) => {
	router.use('/api', item.routes(), item.allowedMethods())
})

module.exports = router