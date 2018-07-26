/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
});
const controllers = require('../controllers');

// 测试模块
router.post('/test', controllers.hello);

// 提交考勤信息
router.post('/cinsert', controllers.cinsert);

module.exports = router;
