const config = require('../config');

module.exports = async () => {
  // 连接数据库
  const knex = require('knex')(config.db);
  await knex.schema.hasTable(config.cdbName)
    .then(async exists => {
      if(!exists) {
        // 定义和创建数据表
        await knex.schema.createTable(config.cdbName, function (table) {
          table.increments('check_id');
          table.string('stu_id').collate('utf8_unicode_ci');
          table.string('stu_name').collate('utf8_unicode_ci');
          table.dateTime('date_time').defaultTo(knex.fn.now());
          table.boolean('check_in');
          table.boolean('check_out');
          table.boolean('morning');
          table.boolean('afternoon');
        });
      } else {
        // 插入测试信息
        if(config.env === 'dev') {
          await knex(config.cdbName).truncate();
          let now = new Date();
          await knex(config.cdbName).insert([
            {
              stu_id: 'Z003',
              stu_name: '张三',
              date_time: now,
              check_in: false,
              check_out: true,
              morning: true,
              afternoon: false
            },
            {
              stu_id: 'Z003',
              stu_name: '张三',
              date_time: new Date(2018, 6, 3),
              check_in: false,
              check_out: true,
              morning: false,
              afternoon: true
            },
            {
              stu_id: 'Z003',
              stu_name: '张三',
              date_time: new Date(2018, 7, 3),
              check_in: false,
              check_out: true,
              morning: false,
              afternoon: true
            },
            {
              stu_id: 'Z003',
              stu_name: '张三',
              date_time: new Date(2018, 6, 6),
              check_in: false,
              check_out: true,
              morning: false,
              afternoon: true
            }
          ]);
        }
      }
    });
};

