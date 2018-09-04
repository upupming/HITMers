const event = require('../../utils/event');
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
    showRegisterPopup: false,
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

  toggleRegisterPopup() {
    this.setData({
      showRegisterPopup: !this.data.showRegisterPopup
    });
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
  abandonRegister() {
    this.setData({
      showRegisterPopup: false
    });
  },
  submitInfo(event) {
    if(this.isIdLegal(event.detail.value.stuId) && 
      this.isNameValid(event.detail.value.stuName) &&
      this.isPasswordLegal(event.detail.value.stuPassword)) {  
      request.login(event.detail.value.stuId, event.detail.value.stuPassword)
        .then(res => {
          if(res.statusCode === 200) {
            util.show(this.data.language.loginSucceed, 'success');
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
            globalData.user = res.data.user;
          }
        });
        
      this.setData({
        showLoginPopup: false
      });
    }
  },
  submitRegister(event) {
    let values = event.detail.value;
    if(this.isIdLegal(values.stuId) && 
      this.isNameValid(values.stuName) &&
      this.isPasswordLegal(values.stuPassword)) {
      request.register(
        {
          id: values.stuId,
          name: values.stuName,
          identify: values.identify,
          phone_number:values.phone_number,
          language: values.language,
          session: values.session,
          email: values.email,
          school: values.school,
          password: values.stuPassword
        },
        values.registerCode
      ).then(res => {
        if(res.statusCode === 200) {
          util.show(this.data.language.registerSucceed, 'success');
          this.setData({
            showRegisterPopup: false
          });
        }
      });
    }
  },

  // zan ui 的 bug，这样做是为了响应最后 field 的键盘上的√被按下
  handleFieldChange() {
    // do nothing
  },
  register() {
    this.setData({
      showRegisterPopup: true
    });
  },
  login() {
    this.setData({
      showLoginPopup: true
    });
  },

  changePassword() {
    this.setData({
      showChangePasswordPopup: true
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
    this.setData({
      logged: false
    });
  }
});
