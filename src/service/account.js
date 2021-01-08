const { Account } = require('../model/index');

class AccountService {
    async getAccountById(id) {
        return await Account.findOne({
            where: {
                id: id,
            },
        });
    };
    async getAccountByUserName(name) {
        return Account.findOne({
            where: {
                username: name,
                deletedAt: null
            },
        });
    };
    async createAccount(params) {
        return Account.create(params);
    };
    async delAccount(id) {
        return Account.destroy({
            where: {
                id: id
            }
        })
    };
    async updateAccount(id,params) {
        const item = await this.getAccountById(id)
        if (item) {
            return item.update(params)
        } else {
            throw new Error('the data with id is not exist!');
        }
    };
    async setToken(id,token){
        const item = await this.getAccountById(id)
         if (item) {
            return item.update({token:token})
        } else {
            throw new Error('the data with id is not exist!');
        }
    };
}

module.exports = new AccountService();