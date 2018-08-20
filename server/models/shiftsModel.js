const config = require('../config');

module.exports = async () => {
    // 连接数据库
  const knex = require('knex')(config.db);
  await knex.schema.hasTable(config.shiftsModel)
    .then(async exists => {
      if(!exists) {  
      // 定义和创建数据表
        await knex.schema.createTable(config.shiftsModel, function(table) {
          // 唯一标识
          table.increments('shift_id');
          // 学号不可重复
          table.string('stu_id').collate('utf8_unicode_ci');
          table.string('year').defaultTo(new Date().getFullYear());
          table.integer('month');
          table.integer('day');
          table.boolean('morning');
          table.string('status').collate('utf8_unicode_ci').defaultTo('working');
        });
      } else {
        // 插入测试信息
        if(config.env === 'dev') {
          await knex(config.shiftsModel).truncate();
          await knex(config.shiftsModel).insert([
            {
              stu_id: 'Z003',
              month: 8,
              day: 11,
              morning: true,
              status: 'working'
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 11,
              morning: true,
              status: 'waiting'
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 11,
              morning: true,
              status: 'studying'
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 11,
              morning: true,
              status: 'studying'
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 11,
              morning: false,
              status: 'studying'
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 11,
              morning: false,
              status: 'studying'
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 11,
              morning: false,
              status: 'studying'
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 11,
              morning: false,
              status: 'studying'
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 12,
              morning: true,
              status: 'studying'
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 12,
              morning: true,
              status: 'working'
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 12,
              morning: true
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 12,
              morning: true,
              status: 'waiting'
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 12,
              morning: false
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 12,
              morning: false
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 12,
              morning: false
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 12,
              morning: false,
              status: 'working'
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 13,
              morning: true
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 13,
              morning: true
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 13,
              morning: true
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 13,
              morning: true
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 13,
              morning: false
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 13,
              morning: false,
              status: 'working'
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 13,
              morning: false,
              status: 'waiting'
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 13,
              morning: false
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 4,
              morning: true
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 4,
              morning: true
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 4,
              morning: true
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 4,
              morning: true
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 4,
              morning: false
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 4,
              morning: false
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 4,
              morning: false
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 4,
              morning: false
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 14,
              morning: true
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 14,
              morning: true
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 14,
              morning: true
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 14,
              morning: true,
              status: 'studying'
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 14,
              morning: false
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 14,
              morning: false
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 14,
              morning: false
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 14,
              morning: false,
              status: 'waiting'
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 15,
              morning: true
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 15,
              morning: true
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 15,
              morning: true
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 15,
              morning: true
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 15,
              morning: false,
              status: 'working'
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 15,
              morning: false
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 15,
              morning: false
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 15,
              morning: false
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 16,
              morning: true
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 16,
              morning: true,
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 16,
              morning: true,
              status: 'waiting'
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 16,
              morning: true
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 16,
              morning: false,
              status: 'studying'
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 16,
              morning: false
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 16,
              morning: false
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 16,
              morning: false
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 17,
              morning: true
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 17,
              morning: true
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 17,
              morning: true
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 17,
              morning: true
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 17,
              morning: false
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 17,
              morning: false
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 17,
              morning: false
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 17,
              morning: false
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 18,
              morning: true
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 18,
              morning: true
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 18,
              morning: true
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 18,
              morning: true
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 18,
              morning: false
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 18,
              morning: false
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 18,
              morning: false
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 18,
              morning: false
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 19,
              morning: true
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 19,
              morning: true
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 19,
              morning: true
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 19,
              morning: true
            },
      
            {
              stu_id: 'Z003',
              month: 8,
              day: 19,
              morning: false
            },
            {
              stu_id: 'L004',
              month: 8,
              day: 19,
              morning: false
            },
            {
              stu_id: 'W005',
              month: 8,
              day: 19,
              morning: false
            },
            {
              stu_id: 'Z006',
              month: 8,
              day: 19,
              morning: false
            } 
          ]);
        }
      }
    });
};