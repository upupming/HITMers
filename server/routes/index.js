/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
});
const controllers = require('../controllers');

// Login varification
router.get('/login', controllers.login);

// Change password
router.put('/change-password', controllers.changePassword);

// 提交考勤信息
router.post('/cinsert', controllers.cinsert);

// 信息录入
router.post('/info-insert', controllers.infoInsert);

// 值班查询
router.get('/monthly', controllers.monthly);

module.exports = router;
