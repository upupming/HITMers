/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://pmdt8kru.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 签到/出接口
        checkUrl: `${host}/weapp/cinsert`,
        // 录入学号、姓名接口
        saveInfoUrl: `${host}/weapp/info-insert`,
        getMonthlyUrl: `${host}/weapp/monthly`,
    }
};

module.exports = config;
