const config = require('../config')

module.exports = async (ctx, next) => {
  // 连接数据库
  const knex = require('knex')(config.db);
  // 定义和创建数据表
  await knex.schema.createTableIfNotExists(config.cdbName, function(table) {
    table.string('wx_id');
    table.string('date');
    table.string('time');
    table.string('check_in');
    table.string('check_out');
  })
}
