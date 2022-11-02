const router = require('koa-router')
const TemplateController = require('../../controller/TemplateController');

const templateRouter = new router({ prefix: '/template' })
// userRouter.post('/login',AccountController.login)
// 创建模板
templateRouter.post('/makeTemplate', TemplateController.makeTemplate)
// 获取页面信息
templateRouter.get('/getPageInfo', TemplateController.getPageInfo)

module.exports = templateRouter
