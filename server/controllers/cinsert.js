// 提交考勤信息
module.exports = async(ctx, next) => {
  // ctx 对应 koa，res 对应 knex
  let myDate = new Date();
  let info = {
    wx_id: ctx.request.body.wx_id,
    date: myDate.toLocaleDateString,
    time: myDate.toLocaleTimeString
  };
  await knex(config.cdbName).insert(info)
    .catch(function(e) {
      console.error(e);
    })
    .then(
      console.log("Check in/out success")
    );
  console.log(info);
  return ctx.response.body = ctx.request.body;
}