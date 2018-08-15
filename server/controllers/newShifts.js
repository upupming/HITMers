const config = require('../config'); 
const knex = require('knex')(config.db); 

let allowAddShift = true;

// 新增班次接口
module.exports = async (ctx) => { 
  console.log(ctx);

  if(allowAddShift) {
    await knex(config.shiftsModel).insert(ctx.request.body);
  }
  else { 
    ctx.status = 403; 
  }

  return ctx.response.body = ctx.request.body;
};
