//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

import event from '../../utils/event'

Page({
    data: {
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: '',
        language: '',
        languageCode: ['zh-Hans', 'en'],
        languages: ['简体中文', 'English'],
        languageIndex: 0
    },

    onLoad: function() {
        this.setLanguage();
    },

    changeLanguage(e) {
        let index = e.detail.value;
        this.setData({
            languageIndex: index
        });
        wx.T.setLocale(this.data.languageCode[index]);
        this.setLanguage();
        event.emit('languageChanged', this.data.languageCode[index]);
    },

    setLanguage() {
        this.setData({
            language: wx.T.getLanguage()
        });
    },

    // 用户登录
    login: function() {
        if (this.data.logged) return

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
                    })
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
})
