/**
 * 小程序配置文件
 */

/* global wx */
let host = wx.getSystemInfoSync().model === 'iPhone 5' ? 
  'http://localhost:5757': 'https://hitmers-api.solotime.xyz';

let apiPath = `${host}/weapp`;

var config = {
  env: 'dev',
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
    checksUrl: `${apiPath}/checks`,
    // Shifts information API
    shiftsUrl: `${apiPath}/shifts`
  }
};

module.exports = config;
