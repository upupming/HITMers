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

// 个人值班查询
router.get('/checks', controllers.checks);

// 值班表查询
router.get('/shifts', controllers.getShifts.all);
router.get('/shifts/:id', controllers.getShifts.id);
// 值班表新建
router.post('/shifts', controllers.newShifts);
// 值班表删除
router.delete('/shifts', controllers.deleteShifts);

module.exports = router;
