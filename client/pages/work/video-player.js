const request = require('../../utils/requests');
const video = require('../../videos');

Page({
  data: {
    loading: true
  },
  onLoad(params) {
    this.setData(params);

    request.getRawVideoUrl(params.video_code, video.username, video.password)
      .then(res => {
        let url = res.data.files['mp4'].url;
        this.setData({
          videoUrl: 'https:' + url,
          loading: false
        });
      });
  },

  onShareAppMessage() {
    return {
      title: this.data.subject,
      path: `/pages/work/video-player?video_code=${this.data.video_code}&desc=${this.data.desc}&time=${this.data.time}&user=${this.data.user}&subject=${this.data.subject}`
    };
  }
});