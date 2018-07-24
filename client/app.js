//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

import locales from './utils/locales'
import T from './utils/i18n'

T.registerLocale(locales);
let langIndex = wx.getStorageSync('langIndex') || 0;
T.setLocaleByIndex(langIndex);
wx.T = T;

App({
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
  },

  globalData: {
    // 登录信息
    logged: wx.getStorageSync('logged') || false,
    userInfo: wx.getStorageSync('userInfo') || undefined
  }
})