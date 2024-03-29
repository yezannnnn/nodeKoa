const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const parameter = require('koa-parameter')
var cors = require('koa2-cors');
const WebSocket = require('ws');

const index = require('./src/routes/index')
// 中间件
const jsonResponse = require('./src/middleware/jsonResponse')
const { jwtInit } = require('./src/middleware/jwt')

// 异常状态处理 需要再jwtInit前
app.use(async (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401
            ctx.body = {
                code: 401,
                msg: '密令无效',
                data: null
            }
        } else {
            throw err
        }
    })
})

//允许跨域
app.use(cors());
app.use(jsonResponse())
app.use(jwtInit())
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
// validator
app.use(parameter(app))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

// ws
// const ws = new WebSocket.Server({port: 8888});
// ws.on('connection', ws => {
//     console.log('server connection');

//     ws.on('message', msg => {
//         console.log('server receive msg：', msg);
//         let data = { type: 1, content:'11111', cid: '2' }
//         ws.send(JSON.stringify(data))
//     });

//     ws.send(JSON.stringify({ type: 1, content:'11111', cid: '2' }));
// });


module.exports = app