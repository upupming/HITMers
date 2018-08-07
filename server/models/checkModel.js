const config = require('../config');

module.exports = async () => {
  // 连接数据库
  const knex = require('knex')(config.db);
  // 定义和创建数据表
  await knex.schema.createTableIfNotExists(config.cdbName, function (table) {
    table.string('wx_name').collate('utf8_unicode_ci');
    table.string('stu_id').collate('utf8_unicode_ci');
    table.string('stu_name').collate('utf8_unicode_ci');
    table.dateTime('date_time');
    table.boolean('check_in');
    table.boolean('check_out');
    table.boolean('morning');
    table.boolean('afternoon');
  })
}
