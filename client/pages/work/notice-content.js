import event from '../../utils/event';

Page({
  data: {
  },

  onLoad: function (params) {
    this.setLanguage();
    event.on('languageChanged', this, this.setLanguage);

    this.setData(params);
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

  onShareAppMessage() {
    return {
      title: this.data.subject,
      path: `/pages/work/notice-content?subject=${this.data.subject}&content=${this.data.content}&time={${this.data.time}&user=${this.data.user}`
    };
  }
});