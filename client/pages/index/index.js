/* global getApp wx Page*/

import event from '../../utils/event';
import '../../utils/wxPromise.min.js';
const config = require('../../config');
const Toast = require('../../zan-ui/toast/toast');
const Dialog = require('../../zan-ui/dialog/dialog');

let globalData = getApp().globalData;

Page({
  data: {
    logged: false,
    requestResult: '',
    language: '',
    languages: ['简体中文', 'English'],
    langIndex: 0,
    showLoginPopup: false,
    showChangePasswordPopup: false,
    loading: true
  },

  onLoad: function () {
    this.setLanguage();
    this.setData({
      langIndex: globalData.langIndex,
      logged: globalData.logged,
      stuId: globalData.stuId,
      stuName: globalData.stuName,
      loading: false
    });
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

  toggleLoginPopup() {
    this.setData({
      showLoginPopup: !this.data.showLoginPopup
    });
  },
  toggleChangePasswordPopup() {
    this.setData({
      showChangePasswordPopup: !this.data.showChangePasswordPopup
    });
  },
  abandonInfo() {
    this.setData({
      showLoginPopup: false
    });
  },
  abandonPassword() {
    this.setData({
      showChangePasswordPopup: false
    });
  },
  submitInfo(event) {
    this.setData({
      stuId: event.detail.value.stuId || null,
      stuName: event.detail.value.stuName || null,
      stuPassword: event.detail.value.stuPassword || null
    });

    globalData.stuId = this.data.stuId;
    globalData.stuName = this.data.stuName;
    globalData.stuPassword = this.data.stuPassword;

    // console.log('globalData changed to: ');
    // console.log(globalData);

    let that = this;
    Toast({
      type: 'loading',
      message: that.data.language.logining,
      selector: '#toast'
    });
    wx.pro.request({
      url: config.service.loginUrl,
      method: 'GET',
      data: {
        stu_id: this.data.stuId,
        stu_name: this.data.stuName,
        stu_password: this.data.stuPassword
      },
      header: {
        'content-type': 'application/json' // 默认值
      }
    }).then( res =>{
      Toast.clear();
      if(res.statusCode === 200) {
        Toast({
          type: 'success',
          message: that.data.language.loginSucceed,
          selector: '#toast',
          timeout: 1500
        });
        
        setTimeout(() => {
          this.setData({
            logged: true
          });
          globalData.logged = true;
          if(res.data.stu_password_changed_times === 0) {
            this.showChangePasswordDialog();
          }
        }, 1500);
      } else {
        Toast({
          type: 'fail',
          message: res.statusCode === 401 ? that.data.language.wrongPassword : that.data.language.loginFailed,
          selector: '#toast',
          timeout: 1500
        });
      } 
    }).catch( () => {
      Toast.clear();
      Toast({
        type: 'fail',
        message: that.data.language.requestError,
        selector: '#toast',
        timeout: 1500
      });
    });

    this.setData({
      showLoginPopup: false
    });
  },
  // zan ui 的 bug，这样做是为了响应最后 field 的键盘上的√被按下
  handleFieldChange() {
    // do nothing
  },
  onGotUserInfo(res) {
    // console.log('User information got: ');
    // console.log(res);

    globalData.userInfo = res.detail.userInfo;  
    
    this.setData({
      userInfo: globalData.userInfo,
      showLoginPopup: true
    });
  },

  changePassword() {
    this.setData({
      showChangePasswordPopup: true
    });
  },

  showChangePasswordDialog() {
    let that = this;
    Dialog({
      title: that.data.language.changePassword,
      message: that.data.language.shouldChangePassword,
      selector: '#change-password-dialog',
      buttons: [{
        text: that.data.language.confirm,
        color: '#49B1F5',
        type: 'changePassword'
      }]
    }).then(({type}) => {
      if(type === 'changePassword') {
        this.setData({
          showChangePasswordPopup: true
        });
      }
    });
  },

  submitPassword(event) {
    let oldPassword = event.detail.value.oldPassword;
    let newPassword = event.detail.value.newPassword;

    let that = this;
    if(oldPassword !== this.data.stuPassword) {
      Toast({
        message: that.data.language.wrongOldPassword,
        type: 'fail',
        selector: '#toast',
        timeout: 1500
      });
      return;
    }

    wx.pro.request({
      url: config.service.changePasswordUrl,
      method: 'PUT',
      data: {
        stu_id: that.data.stuId,
        stu_new_password: newPassword
      },
      header: {
        'content-type': 'application/json' // 默认值
      }
    }).then( res => {
      if(res.statusCode === 200 && res.data.stu_password_changed_times) {
        this.setData({
          showChangePasswordPopup: false
        })
        Toast({
          type: 'success',
          message: that.data.language.changePasswordSucceed,
          selector: '#toast',
          timeout: 1500
        });
      }
    });
  },

  logout: function () {
    globalData.logged = false;
    globalData.userInfo = null;
    this.setData({
      logged: false
    });
  }
})
