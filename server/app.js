const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')

// 新建数据库（如果已经建好可以去除这段代码）
// const checkModel = require('./models/checkModel');
// checkModel();
// const infoModel = require('./models/infoModel');
// infoModel();
const loginModel = require('./models/loginModel');
loginModel();

// 解析请求体
app.use(bodyParser())

// 引入路由分发
const router = require('./routes')
app.use(router.routes())

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
