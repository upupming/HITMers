const config = require('../config');

module.exports = async () => {
  // 连接数据库
  const knex = require('knex')(config.db);

  await knex.schema.hasTable(config.logindbName)
    .then(async exists => {
      if(!exists) {
        // 定义和创建数据表
        await knex.schema.createTable(config.logindbName, function(table) {
          // 学号不可重复
          table.string('stu_id').unique().collate('utf8_unicode_ci');
          table.string('stu_name').collate('utf8_unicode_ci');
          table.bigInteger('phone_number', 13);
          table.string('language').collate('utf8_unicode_ci');
          table.integer('session');
          table.string('stu_password').collate('utf8_unicode_ci');
          table.integer('stu_password_changed_times').defaultTo(0);
          // 声誉，用来评定小班长
          table.integer('stu_reputation').defaultTo(0);
          // 工作量
          table.integer('workload').defaultTo(0);
        });
      } else {
      // 插入测试信息
        if(config.env === 'dev') {
          await knex(config.logindbName).truncate();
          await knex(config.logindbName).insert([
            {
              stu_id: 'Z003',
              stu_name: '张三',
              phone_number: 13849045786,
              language: '中英',
              session: 14,
              stu_password: '13849045786',
              stu_password_changed_times: 0,
              stu_reputation: 0,
              workload: 0
            },
            {
              stu_id: 'L004',
              stu_name: '李四',
              phone_number: 13848888786,
              language: '韩文',
              session: 13,
              stu_password: '13848888786',
              stu_password_changed_times: 0,
              stu_reputation: 0,
              workload: 0
            },{
              stu_id: 'W005',
              stu_name: '王五',
              phone_number: 10009045786,
              language: '俄语',
              session: 15,
              stu_password: '10009045786',
              stu_password_changed_times: 0,
              stu_reputation: 0,
              workload: 0
            },{
              stu_id: 'Z006',
              stu_name: '赵六',
              phone_number: 13877745786,
              language: '日语',
              session: 16,
              stu_password: '13877745786',
              stu_password_changed_times: 0,
              stu_reputation: 0,
              workload: 0
            },
          ]);
        }
      }
    });
};