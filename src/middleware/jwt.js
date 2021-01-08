const koaJwt = require('koa-jwt')
const jsonwebtoken = require('jsonwebtoken')

const SECRET = 'nodeKoa'
const UNLESSPATH = [/\/api\/user\/login/]
const EXPIRES = '2h'

function jwtInit() {
    return koaJwt({
        secret: SECRET
    }).unless({
        path: UNLESSPATH
    })
};

async function signToken(name, id) {
    return jsonwebtoken.sign({
        name: account.username,
        _id: account.id
    }, SECRET, { expiresIn: EXPIRES });
};

async function verToken(token) {
    return jsonwebtoken.verify(token.split(" ")[1], SECRET)
};


module.exports = {
    jwtInit,
    signToken,
    verToken
};