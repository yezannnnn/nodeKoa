const devConfig = {
  database: 'test', // 使用哪个数据库
  username: 'root', // 用户名
  password: 'a6843021', // 口令
  host: 'localhost', // 主机名
  port: '3306',
  dialect: 'mysql',
};

const prodConfig = {
  database: 'cauth', // 使用哪个数据库
  username: 'root', // 用户名
  password: '', // 口令
  host: 'localhost', // 主机名
  port: '3306',
  dialect: 'mysql',
};

if(process.env.PUBLISH_ENV === "prod"){
	var config = prodConfig
} else {
	var config = devConfig
}

module.exports = config;