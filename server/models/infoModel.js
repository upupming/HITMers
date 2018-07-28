const config = require('../config')

module.exports = async (ctx, next) => {
  // 连接数据库
  const knex = require('knex')(config.db);
  // 定义和创建数据表
  await knex.schema.createTableIfNotExists(config.infodbName, function(table) {
    table.string('wx_name').collate('utf8_unicode_ci');
    // 学号不可重复
    table.string('stu_id').unique().collate('utf8_unicode_ci');;
    table.string('stu_name').collate('utf8_unicode_ci');
    // 工作量
    table.integer('workload');
  })
}
