const event = require('../../utils/event');
const Dialog = require('../../zan-ui/dialog/dialog');
const request = require('../../utils/requests');
const util = require('../../utils/util');

let globalData = getApp().globalData;

Page({
  data: {
    logged: false,
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
    globalData.language = globalData.languages[wx.T.langCode[this.data.langIndex]];
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
    if(this.isIdLegal(event.detail.value.stuId) && 
      this.isNameValid(event.detail.value.stuName) &&
      this.isPasswordLegal(event.detail.value.stuPassword)) {  
      request.login(this.data.stuId, this.data.stuPassword)
        .then(res => {
          this.setData({
            logged: true
          });
          this.setData({
            stuId: event.detail.value.stuId,
            stuName: event.detail.value.stuName,
            stuPassword: event.detail.value.stuPassword
          });
          globalData.stuId = this.data.stuId;
          globalData.stuName = this.data.stuName;
          globalData.stuPassword = this.data.stuPassword;
          globalData.logged = true;
          globalData.token = res.data.token;
          this.shouldChangePassword();
        });
        
      this.setData({
        showLoginPopup: false
      });
    }
  },

  shouldChangePassword() {
    request.getUserInfo(this.data.stuId)
      .then(res => {
        if(res.data.password_changed_times === 0) {
          this.showChangePasswordDialog();
        }
      });
  },

  // zan ui 的 bug，这样做是为了响应最后 field 的键盘上的√被按下
  handleFieldChange() {
    // do nothing
  },
  onGotUserInfo(res) {
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

  isIdLegal(id) {
    if(id == null || !/^\w+$/.test(id)) {
      util.show(this.data.language.stuId.illegal, 'fail');
      return false;
    }
    return true;
  },
  isNameValid(name) {
    if(name == null || !/^[\u4e00-\u9fa5]+$/gm.test(name)) {
      util.show(this.data.language.stuName.illegal, 'fail');
      return false;
    }
    return true;
  },
  isPasswordLegal(password) {
    if(password === '' || password === null) {
      util.show(this.data.language.illegalPassword, 'fail');
      return false;
    }
    return true;
  },

  submitPassword(event) {
    let oldPassword = event.detail.value.oldPassword;
    let newPassword = event.detail.value.newPassword;

    let that = this;
    if(oldPassword !== this.data.stuPassword) {
      util.show(this.data.language.wrongOldPassword, 'fail');
    } 
    else if(this.isPasswordLegal(newPassword)) {
      request.updateUser(this.data.stuId, {password: newPassword})
        .then(res => {
          if(res.data.password_changed_times) {
            this.setData({
              showChangePasswordPopup: false
            });
            this.data.stuPassword = newPassword;
            util.show(that.data.language.changePasswordSucceed, 'success');
          } else {
            util.show(that.data.language.changePasswordFailed, 'fail');
          }
        });
    }
  },

  logout: function () {
    globalData.logged = false;
    globalData.userInfo = null;
    this.setData({
      logged: false
    });
  }
});
