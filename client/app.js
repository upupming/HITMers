import locales from './utils/locales'
import T from './utils/i18n'

T.registerLocale(locales);
let langIndex = wx.getStorageSync('langIndex') || 0;
T.setLocaleByIndex(langIndex);
wx.T = T;

App({
  onLaunch: function () {
  },

  globalData: {
    // 语言设置
    langIndex: wx.getStorageSync('langIndex') || 0,
    // 登录信息
    logged: wx.getStorageSync('logged') || false,
    userInfo: wx.getStorageSync('userInfo') || null,
    // 学号、姓名
    stuId: wx.getStorageSync('stuId') || null,
    stuName: wx.getStorageSync('stuName') || null
  },

  onHide: function() {
    wx.setStorage({
      key: 'langIndex',
      data: this.globalData.langIndex
    });

    wx.setStorage({
      key: 'logged',
      data: this.globalData.logged
    });

    wx.setStorage({
      key: 'userInfo',
      data: this.globalData.userInfo
    });

    wx.setStorage({
      key: 'stuId',
      data: this.globalData.stuId
    });
    wx.setStorage({
      key: 'stuName',
      data: this.globalData.stuName
    });
  }
})