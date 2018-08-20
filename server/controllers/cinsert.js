const config = require('../config');
const knex = require('knex')(config.db);

// 提交考勤信息
module.exports = async(ctx) => {
  console.log(ctx);

  let info = {
    stu_id: ctx.request.body.stu_id,
    stu_name: ctx.request.body.stu_name,
    date_time: new Date(),
    check_in: ctx.request.body.check_in,
    check_out: !ctx.request.body.check_in,
    morning: ctx.request.body.morning,
    afternoon: !ctx.request.body.morning
  };
  await knex(config.cdbName).insert(info)
    .catch(function(e) {
      console.log(e);
    })
    .then( () => {
      console.log('Check in/out success');
    });
  console.log(info);
  
  console.log(info.check_out);
  // 如果签出成功，计入工作量
  if(info.check_out) {
    console.log(info.stu_id + ' 计入一次工作量');
    await knex(config.logindbName)
    .where('stu_id', '=', info.stu_id)
    .increment('workload', 1);
  }

  return ctx.response.body = ctx.request.body;
};