const config = require('../config'); 
const knex = require('knex')(config.db); 

let allowDeleteShift = true;

// 删除班次接口
module.exports = async (ctx) => { 
  console.log(ctx);

  if(allowDeleteShift) {
    await knex(config.shiftsModel)
    .where(ctx.query)
    .del()
    .catch(() => {
      ctx.status = 401;
    });
  }
  else {
    ctx.status = 403;
  }
  return ctx.response.body = ctx.query;
};