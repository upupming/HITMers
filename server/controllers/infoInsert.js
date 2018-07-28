const config = require('../config');
const knex = require('knex')(config.db);

// 提交用户
module.exports = async(ctx, next) => {
  let info = {
    wx_name: ctx.request.body.wx_name,
    stu_id: ctx.request.body.stu_id,
    stu_name: ctx.request.body.stu_name,
    workload: 0
  };
  await knex(config.infodbName).insert(info)
    .catch(function(e) {
      console.log(e);
    })
    .then(
      console.log("record info success")
    );
  console.log(info);
  
  return ctx.response.body = ctx.request.body;

  
}