import event from '../../utils/event';

Page({
  data: {
    links: [
      'https://github.com/upupming/HITMers-node-js-server',
      'https://github.com/upupming/HITMers',
      'https://github.com/upupming/HITMers/issues',
      'https://upupming.site/HITMers'
    ]
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
  
  copy(event) {
    wx.pro.setClipboardData({
      data: this.data.links[event.currentTarget.dataset.linkIndex]
    });
  }
});