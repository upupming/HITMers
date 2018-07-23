import event from '../../utils/event'

const Dialog = require('../../zan-ui/dialog/dialog');

Page({
  data: {
    language: '',
    signedInTimes: 0,
    checkedIn: false
  },
  onLoad: function() {
    this.setLanguage();
    event.on("languageChanged", this, this.setLanguage);
  },
  setLanguage() {
    this.setData({
        language: wx.T.getLanguage()
    });
  },
  signIn() {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        Dialog({
          title: that.data.language.signIn,
          message: "您现在所在地点 \n(纬度, 经度) = (" + res.latitude + ", " + res.longitude + ")",
          selector: "#sign-in-dialog",
          showCancelButton: true
        }).then(() => {
          console.log('=== dialog resolve ===', 'type: confirm');
        }).catch(() => {
          console.log('=== dialog reject ===', 'type: cancel');
        });
      }
    })
  }
});