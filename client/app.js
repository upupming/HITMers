//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

import locales from './utils/locales'
import T from './utils/i18n'

T.registerLocale(locales);
T.setLocale('zh-Hans');
wx.T = T;

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    }
})