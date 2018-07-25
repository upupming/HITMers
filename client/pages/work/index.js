import event from '../../utils/event'

const Dialog = require('../../zan-ui/dialog/dialog');
const config = require('../../config');
const util = require('../../utils/util');

Page({
  data: {
    language: '',
    signedInTimes: 0,
    checkedIn: false
  },
  onLoad: function () {
    this.setLanguage();
    event.on("languageChanged", this, this.setLanguage);
  },
  onShow: function() {
    if(this.data.shouldChangeTitle) {
      wx.T.setNavigationBarTitle();
      this.data.shouldChangeTitle = false;
    }
  },
  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
    this.data.shouldChangeTitle = true;
  },
  signIn() {
    let that = this;
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: res => {
    //     Dialog({
    //       title: that.data.language.signIn,
    //       message: "您现在所在地点 \n(纬度, 经度) = (" + res.latitude + ", " + res.longitude + ")",
    //       selector: "#sign-in-dialog",
    //       showCancelButton: true
    //     }).then(() => {
    //       console.log('=== dialog resolve ===', 'type: confirm');
    //     }).catch(() => {
    //       console.log('=== dialog reject ===', 'type: cancel');
    //     });
    //   }
    // })

    wx.request({
      url: config.service.checkUrl,
      data: {
        wx_id: 'upupming'
      },
      method: 'POST',    
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data);
        util.showSuccess('签到成功');
      },
      fail: function(res) {
        console.log(res.data);
        util.showSuccess('签到失败');
      },
    })
  }
});