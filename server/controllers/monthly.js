const config = require('../config');
const knex = require('knex')(config.db);

// 查询值班记录
module.exports = async(ctx) => {
  console.log(ctx);

  await knex(config.cdbName).where({stu_id: ctx.request.query.stu_id, check_out: true}).select()
    .catch( e => {
      console.error(e);
    })
    .then(data => {
      ctx.response.body = data;
    });

  return ctx.response.body;
};