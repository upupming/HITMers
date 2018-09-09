import event from '../../utils/event';
const request = require('../../utils/requests');

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

    this.fetchVideos();
  },

  fetchVideos() {
    request.getVideos()
      .then(res => {
        if(res.statusCode === 200) {
          let videos = res.data;
          for(let video of videos) {
            let date = new Date(video.created_at);
            video.timeInfo = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
            video.userInfo = video.user.name;
          }    
          this.setData({
            videos,
            loading: false
          });
        }
      });
  },

  newVideo() {
    wx.navigateTo({
      url: './video-submit'
    });
  },
  onPullDownRefresh() {
    this.fetchVideos();
  }
});