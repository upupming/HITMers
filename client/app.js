import locales from './utils/locales'
import T from './utils/i18n'

T.registerLocale(locales);
let savedGlobalData = wx.getStorageSync('globalData');
let langIndex = savedGlobalData.langIndex || 0;
T.setLocaleByIndex(langIndex);
wx.T = T;

App({

  globalData: { },

  onLaunch: function () {
    this.globalData = savedGlobalData || 
      {
        // Language settings
        langIndex: 0,
        // Login status
        logged: false,
        userInfo: null,
        // Student ID, name
        stuId: null,
        stuName: null,
        stuPassword: null,
        // Check in/out status
        checkedIn: false
      };
  },

  onHide: function() {
    wx.setStorage({
      key: 'globalData',
      data: this.globalData
    });
  }
})