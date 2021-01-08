const AccountService = require('../service/account');
const md5 = require('md5-node')
// parameter
const accountParam = require('./parameter/account')

class AccountController {
    async login(ctx, next) {
        // 校验器
        ctx.verifyParams(accountParam.login);
        const { username, password } = ctx.request.body;
        var account = await AccountService.getAccountByUserName(username);
        if (account) {
            if (md5(password) === account.password) {
                ctx.success(account)
            } else {
                ctx.fail(201, '密码错误')
            }
        } else {
            ctx.fail(202, '用户名不存在')
        }
    };
    // 新增用户
    async create(ctx, next) {
        // 校验器
        ctx.verifyParams(accountParam.create);
        const params = ctx.request.body
        const account = await AccountService.getAccountByUserName(params.username)
        if (account) {
            ctx.fail(301, '用户名已存在')
        } else {
            const acc = await AccountService.createAccount(params)
            ctx.success(acc)
        }
    };
    // 更新用户
    async update(ctx) {
        // 校验器
        ctx.verifyParams(accountParam.update);
        const id = ctx.params.id
        const params = ctx.request.body
        const account = await AccountService.getAccountByUserName(params.username)
        if (account) {
            const acc = await AccountService.updateAccount(id, params)
            ctx.success(acc)
        } else {
            ctx.fail(302, '用户不存在')
        }

    };
    // 删除用户
    async del(ctx) {
        const id = ctx.params.id
        await AccountService.delAccount(id)
        ctx.success()
    };
}

module.exports = new AccountController();