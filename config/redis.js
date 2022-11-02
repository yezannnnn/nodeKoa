const redisStore = require('koa-redis')
const Redisdb = require('ioredis')

class Redis {
    constructor() {
        this.config = {
            port: 6379,
            host: '127.0.0.1',
            db: 0
        }
        this.client = new Redisdb(this.config)
        this.options = { client: this.client, db: 0 }
        this.store = redisStore(this.options)
    }

    async storeClient() {
        return this.store.client
    }

    async set(key, value, expiryMode, time) {
        return this.client.set(key, value, expiryMode, time)
    }

    async get(key) {
        return this.client.get(key)
    }

    async hmset(key, data) {
        return this.client.hmset(key, data)
    }

    async expire(key, time) {
        return this.client.expire(key, time)
    }

    async hmget(key) {
        return this.client.hgetall(key)
    }

    async getAllKey() {
        return this.client.keys('*')
    }
}

module.exports = new Redis();