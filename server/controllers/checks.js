const config = require('../config');
const knex = require('knex')(config.db);

// 查询值班记录
module.exports = async(ctx) => {
  console.log(ctx);

  await knex(config.cdbName)
    .where({
      stu_id: ctx.request.query.stu_id, 
      check_out: true
    })
    .select()
    .catch( e => {
      console.error(e);
      ctx.status = 502;
    })
    .then(data => {
      ctx.response.body = data.filter(checkOut => {
        let date = checkOut.date_time;
        return date.getFullYear() == ctx.query.year &&
          date.getMonth() == ctx.query.month - 1;
      });
    });

  return ctx.response.body;
};