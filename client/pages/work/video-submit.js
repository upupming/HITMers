import event from '../../utils/event';
const request = require('../../utils/requests');
let util = require('../../utils/util');

Page({
  data: {
  },

  onLoad: function () {
    this.setLanguage();
    event.on('languageChanged', this, this.setLanguage);
  },
  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
    this.data.shouldChangeTitle = true;
  },
  onShow() {
    if (this.data.shouldChangeTitle) {
      wx.T.setNavigationBarTitle();
      this.data.shouldChangeTitle = false;
    }
  },
  
  submitVideo(event) {
    request.addVideo(event.detail.value.subject, event.detail.value.desc, event.detail.value.video_code)
      .then(res => {
        if(res.statusCode === 200) {
          util.show(this.data.language.videoAdded, 'success');
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            });
          }, 1500);
        }
      });
  },
  abandonVideo() {
    wx.navigateBack({
      delta: 1
    });
  }
});