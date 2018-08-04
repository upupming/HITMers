const config = require('../config');
const knex = require('knex')(config.db);

// 查询值班记录
module.exports = async(ctx, next) => {
  console.log(ctx);

  await knex(config.cdbName).where({stu_id: ctx.request.query.stu_id, check_out: true}).select()
    .catch( e => {
      console.error(e);
    })
    .then(data => {
      console.log(data);
      ctx.response.body = data;
      console.log('成功查询到值班记录');
    })

  return ctx.response.body;
}