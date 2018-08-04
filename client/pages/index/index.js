import event from '../../utils/event';
import '../../utils/wxPromise.min.js';
const config = require('../../config');
const Toast = require('../../zan-ui/toast/toast');

let globalData = getApp().globalData;

Page({
  data: {
    logged: false,
    requestResult: '',
    language: '',
    languages: ['简体中文', 'English'],
    langIndex: 0,
    showLoginPopup: false
  },

  onLoad: function () {
    this.setData({
      langIndex: globalData.langIndex,
      logged: globalData.logged,
      stuId: globalData.stuId,
      stuName: globalData.stuName
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

  abandonInfo() {
    this.setData({
      showLoginPopup: false
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

    console.log('globalData changed to: ');
    console.log(globalData);

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
    }).then((res) => {
      Toast.clear();
      return res;
    }).catch( err => {
      throw err;
    }).then( res =>{
      if(res.statusCode === 200) {
        Toast({
          type: 'success',
          message: that.data.language.loginSucceed,
          selector: '#toast'
        });
        this.setData({
          logged: true
        });
        globalData.logged = true;
      } else{
        Toast({
          type: 'fail',
          message: res.statusCode === 401 ? that.data.language.wrongPassword : that.data.language.loginFailed,
          selector: '#toast'
        });
      } 
    }).catch( err => {
      console.log(err);
      Toast({
        type: 'fail',
        message: that.data.language.requestError,
        selector: '#toast'
      });
    });

    this.setData({
      showLoginPopup: false
    });
  },
  // zan ui 的 bug，这样做是为了让最后一栏 field 的键盘上的√能起到保存数据的作用
  handleFieldChange(e) {
    console.log(e);
    this.saveInfo();
  },

  onGotUserInfo(res) {
    console.log('User information got: ');
    console.log(res);

    globalData.userInfo = res.detail.userInfo;  
    
    this.setData({
      userInfo: globalData.userInfo,
      showLoginPopup: true
    });
  },

  logout: function () {
    globalData.logged = false;
    globalData.userInfo = null;
    console.log(getApp().globalData);
    this.setData({
      logged: false
    });
  }
})
