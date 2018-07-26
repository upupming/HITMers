const config = require('../config');
const knex = require('knex')(config.db);

// 提交考勤信息
module.exports = async(ctx, next) => {
  // ctx 对应 koa，res 对应 knex
  let myDate = new Date();
  let info = {
    wx_id: ctx.request.body.wx_id,
    date: myDate.toLocaleDateString(),
    time: myDate.toLocaleTimeString(),
    check_in: ctx.request.body.check_in,
    check_out: ctx.request.body.check_out,
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