/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
// let host = 'https://pmdt8kru.qcloud.la';
// 本地调试
let host = 'http://localhost:5757';

let apiPath = `${host}/weapp`;

var config = {
  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // Check in/out API
    checkUrl: `${apiPath}/cinsert`,
    // Login API
    loginUrl: `${apiPath}/login`,
    // Change password API
    changePasswordUrl: `${apiPath}/change-password`,
    // 录入学号、姓名接口
    saveInfoUrl: `${apiPath}/info-insert`,
    getMonthlyUrl: `${apiPath}/monthly`,
    // Shifts information API
    shiftsUrl: `${apiPath}/shifts`
  }
};

module.exports = config;
