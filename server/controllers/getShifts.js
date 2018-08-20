const config = require('../config'); 
const knex = require('knex')(config.db); 
const thisYear = new Date().getFullYear();

// 查询班次接口
module.exports.all = async (ctx) => { 
  console.log(ctx);

  let shifts = [];

  // 如果只是一个月内
  if(ctx.query.startMonth === ctx.query.endMonth) {
    await knex(config.shiftsModel)
      .where('year', ctx.query.year || thisYear)
      .where('month',  ctx.query.startMonth)
      .whereBetween('day', [ctx.query.startDay, ctx.query.endDay])
      .then(data => {
        shifts = data;
      })
      .catch(err => {
        console.log(err);
      });
  }
  // 如果跨过多个月
  else if(ctx.query.startMonth < ctx.query.endMonth) {
    await knex(config.shiftsModel)
      .where('year', ctx.query.year || thisYear)
      // 第一个月
      .where(function() {
        this.where('month', ctx.query.startMonth)
            .where('day', '>=', ctx.query.startDay);
      })
      // 中间的月
      .orWhereIn('month', [ctx.query.startMonth + 1, ctx.query.endMonth - 1])
      // 最后一个月
      .orWhere(function() {
        this.where('month', ctx.query.endMonth)
            .where('day', '<=', ctx.query.endDay);
      })
      .then(data => {
        shifts = data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  function getDateDistance(startMonth, startDay, endMonth, endDay) {
    const ONE_DAY = 24*60*60*1000;
    let endDate = new Date(), startDate = new Date();
    endDate.setMonth(endMonth - 1, endDay);
    startDate.setMonth(startMonth - 1, startDay);
    return Math.round((endDate - startDate)/ONE_DAY);
  }

  let totalDays = getDateDistance(ctx.query.startMonth, ctx.query.startDay, ctx.query.endMonth, ctx.query.endDay) + 1;
  // 初始化三维数组
  let shiftsArray = [];
  for(let i = 0; i < totalDays; i++) {
    shiftsArray[i] = [];
    for(let j = 0; j<2; j++) {
      shiftsArray[i][j] = [];
    }
  }
  // push 数据
  for(let shift of shifts) {
    // 相距天数：第一维索引
    let dayIndex = getDateDistance(ctx.query.startMonth, ctx.query.startDay, shift.month, shift.day);
    // 上下午：第二维索引
    let periodIndex = shift.morning ? 0 : 1;
    // 加入第三维中
    await knex(config.logindbName)
      .where('stu_id', shift.stu_id)
      .then((data) => {
        shiftsArray[dayIndex][periodIndex].push({
          shift_id: shift.shift_id,
          name: data[0].stu_name,
          phoneNumber: data[0].phone_number,
          language: data[0].language,
          session: data[0].session,
          status: shift.status,
          reputation: data[0].stu_reputation
        });
      });
  }
  // 按声誉排序
  function reputationCompare(a, b) {
    return a.reputation < b.reputation ? 1 : -1;
  }
  // 第一维：日期
  for(let dayIndex = 0; dayIndex < totalDays; dayIndex++) {
    // 第二维：上下午
    for(let periodIndex = 0; periodIndex < 2; periodIndex++) {
      shiftsArray[dayIndex][periodIndex].sort(reputationCompare);
    }
  }

  return ctx.response.body = shiftsArray; 
};

module.exports.id = async (ctx) => {
  console.log(ctx);

  let shifts = [];

  // 如果只是一个月内
  if(ctx.query.startMonth === ctx.query.endMonth) {
    await knex(config.shiftsModel)
      .where('stu_id', ctx.params.id)
      .where('year', ctx.query.year || thisYear)
      .where('month',  ctx.query.startMonth)
      .whereBetween('day', [ctx.query.startDay, ctx.query.endDay])
      .then(data => {
        shifts = data;
      })
      .catch(err => {
        ctx.status = 502;
        console.log(err);
      });
  }
  // 如果跨过多个月
  else if(ctx.query.startMonth < ctx.query.endMonth) {
    await knex(config.shiftsModel)
      .where('stu_id', ctx.params.id)
      .where('year', ctx.query.year || thisYear)
      // 第一个月
      .where(function() {
        this.where('month', ctx.query.startMonth)
            .where('day', '>=', ctx.query.startDay);
      })
      // 中间的月
      .orWhereIn('month', [ctx.query.startMonth + 1, ctx.query.endMonth - 1])
      // 最后一个月
      .orWhere(function() {
        this.where('month', ctx.query.endMonth)
            .where('day', '<=', ctx.query.endDay);
      })
      .then(data => {
        shifts = data;
      })
      .catch(err => {
        ctx.status = 502;
        console.log(err);
      });
  }

  return ctx.response.body = shifts;
};