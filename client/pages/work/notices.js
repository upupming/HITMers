import event from '../../utils/event';
const request = require('../../utils/requests');

Page({
  data: {
    loading: true,
    showAddPopup: false
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

    this.fetchNotices();
  },

  fetchNotices() {
    request.getNotices()
      .then(res => {
        if(res.statusCode === 200) {
          let notices = res.data;
          for(let notice of notices) {
            let date = new Date(notice.created_at);
            notice.timeInfo = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
            notice.userInfo = notice.user.name;
          }    
          this.setData({
            notices,
            loading: false
          });
        }
      });
  },

  newNotice() {
    wx.navigateTo({
      url: './notice-submit'
    });
  },

  onPullDownRefresh() {
    this.fetchNotices();
  }
});