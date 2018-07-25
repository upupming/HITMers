//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

import event from '../../utils/event'

let globalData = getApp().globalData;

Page({
  data: {
    logged: false,
    requestResult: '',
    language: '',
    languages: ['简体中文', 'English'],
    langIndex: 0
  },

  onLoad: function () {
    this.setData({
      langIndex: globalData.langIndex,
      logged: globalData.logged
    });
    this.setLanguage();
  },

  changeLanguage(e) {
    let index = e.detail.value;
    this.setData({
      langIndex: index
    });
    wx.T.setLocaleByIndex(index);
    this.setLanguage();
    event.emit('languageChanged');

    globalData.langIndex = this.data.langIndex;
  },

  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
    wx.T.setNavigationBarTitle();
  },

  onGotUserInfo(res) {
    console.log(res);

    globalData.logged = true;

    this.setData({
      logged: true
    })

    util.showSuccess(this.data.language.loginSuccessed);
  },

  logout: function () {
    globalData.logged = false;
    this.setData({
      logged: false
    });
  }
})
