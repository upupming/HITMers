import event from '../../utils/event'
const Toast = require('../../zan-ui/toast/toast');
const config = require('../../config');

let globalData = getApp().globalData;

Page({
  data: {
    stuId: 1234567890,
    stuName: '张三'
  },

  readGlobalData() {
    this.setData({
      stuId: globalData.stuId,
      stuName: globalData.stuName
    });
  },

  onLoad() {
    this.readGlobalData();
    this.setLanguage();
    event.on("languageChanged", this, this.setLanguage);
  },
  onShow: function () {
    let that = this;
    new Toast({
      type: 'success',
      message: that.data.language.loginSuccessed,
      selector: '#login-status',
      timeout: 2000
    });

    if (this.data.shouldChangeTitle) {
      wx.T.setNavigationBarTitle();
      this.data.shouldChangeTitle = false;
    }
  },

  // zan ui 的 bug，这样做是为了让最后一栏 field 的键盘上的√能起到保存数据的作用
  handleFieldChange(e) {
    this.saveInfo();
  },

  syncValue(e) {
    this.data[e.currentTarget.id] = e.detail.detail.value;
  },

  saveInfo(flag) {
    console.log(this.data);

    globalData.stuId = this.data.stuId;
    globalData.stuName = this.data.stuName;

    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];

    prevPage.setData({
      stuId: this.data.stuId,
      stuName: this.data.stuName
    });

    console.log('设置好之后的 globalData: ')
    console.log(globalData);

    wx.request({
      url: config.service.saveInfoUrl,
      method: 'POST',
      data: {
        wx_name: globalData.userInfo.nickName,
        stu_id: this.data.stuId,
        stu_name: this.data.stuName
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: (res)=>{
        console.log('数据成功记录到服务器');
        console.log(res);
      },
      fail: (res)=>{
        console.log('数据记录到服务器失败');
        console.log(res);
      }
    });

    if(flag !== 'do-not-back') {
      wx.navigateBack({
        delta: 1
      });
    }
  },

  // 卸载页面时，也将数据保存好
  onUnload() {
    this.saveInfo('do-not-back');
  },


  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
    this.data.shouldChangeTitle = true;
  }
});