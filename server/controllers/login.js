const config = require('../config');
const knex = require('knex')(config.db);

// 登录接口
module.exports = async(ctx, next) => {
  await knex(config.logindbName).where({
    stu_id: ctx.query.stu_id, 
    stu_name: ctx.query.stu_name, 
    stu_password: ctx.query.stu_password}).select()
    .catch( e => {
      console.log(e);

      ctx.response.body = e;
    })
    .then( data => {
      if(data.length == 1) {
        console.log('Login permitted for: ' + ctx.query.stu_id);
        console.log(data);
      } else {
        ctx.status = 401;
      }
      ctx.response.body = data;
    })

  return ctx.response.body;
}