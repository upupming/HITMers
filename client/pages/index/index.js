//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

import event from '../../utils/event'

Page({
  data: {
    userInfo: {},
    logged: false,
    requestResult: '',
    language: '',
    languages: ['简体中文', 'English'],
    langIndex: 0

  },

  onLoad: function () {
    this.setData({
      langIndex: wx.getStorageSync('langIndex')
    });
    this.setLanguage();
    let globalData = getApp().globalData;
    console.log(globalData);
    if (!globalData.logged) {
      this.login();
    } else {
      // 从全局变量中获取登录信息
      this.setData({
        logged: globalData.logged,
        userInfo: globalData.userInfo
      })
    }
  },

  changeLanguage(e) {
    let index = e.detail.value;
    this.setData({
      langIndex: index
    });
    wx.T.setLocaleByIndex(index);
    this.setLanguage();
    event.emit('languageChanged');

    wx.setStorage({
      key: 'langIndex',
      data: this.data.langIndex
    })
  },

  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
    wx.T.setNavigationBarTitle();
  },

  saveLoginStatus() {
    wx.setStorage({
      key: 'logged',
      data: this.data.logged
    });

    wx.setStorage({
      key: 'userInfo',
      data: this.data.userInfo
    });
  },

  // 用户登录
  login: function () {
    if (!this.data.logged) {
      util.showBusy(this.data.language.logining)
      var that = this

      // 调用登录接口
      qcloud.login({
        success(result) {
          if (result) {
            util.showSuccess(that.data.language.loginSuccessed)
            that.setData({
              userInfo: result,
              logged: true
            });
            if (logged) {
              that.saveLoginStatus();
            }
          } else {
            // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
            qcloud.request({
              url: config.service.requestUrl,
              login: true,
              success(result) {
                console.log(result);
                util.showSuccess(that.data.language.loginSuccessed)
                that.setData({
                  userInfo: result.data.data,
                  logged: true
                })

                // 缓存
                if (that.data.logged) {
                  that.saveLoginStatus();
                }
              },

              fail(error) {
                util.showModel(that.data.language.requestError, error)
                console.log(that.data.requestError, error)
              }
            })
          }
        },

        fail(error) {
          util.showModel(that.data.language.loginFailed, error)
          console.log(that.data.language.loginFailed, error)
        }
      })
    }
  },
  logout: function () {
    let globalData = getApp().globalData;
    globalData.logged = false;
    globalData.userInfo = null;
    this.setData({
      logged: false,
      userInfo: null
    });
  }
})
