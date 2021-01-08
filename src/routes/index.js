const router = require('koa-router')()
// models
const userRouter = require('./model/user')

var routerArry = [
	userRouter,
]

routerArry.forEach((item) => {
	router.use('/api', item.routes(), item.allowedMethods())
})

module.exports = router