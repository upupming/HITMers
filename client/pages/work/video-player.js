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
  }
});