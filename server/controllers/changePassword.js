const config = require('../config');
const knex = require('knex')(config.db);

// 修改密码接口
module.exports = async(ctx) => {
  console.log(ctx);

  await knex(config.logindbName)
    .where({stu_id: ctx.request.body.stu_id})
    .update({
      stu_password: ctx.request.body.stu_new_password,
      stu_password_changed_times: knex.raw('stu_password_changed_times + 1')
    });

  return ctx.response.body = (await knex(config.logindbName)
    .where({stu_id: ctx.request.body.stu_id}))[0];
}