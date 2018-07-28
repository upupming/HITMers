const config = require('../config');
const knex = require('knex')(config.db);

// 提交考勤信息
module.exports = async(ctx, next) => {
  // ctx 对应 koa，res 对应 knex
  let info = {
    wx_name: ctx.request.body.wx_name,
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
    .then(
      console.log("Check in/out success")
    );
  console.log(info);
  
  return ctx.response.body = ctx.request.body;

  
}