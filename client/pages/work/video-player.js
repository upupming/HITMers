const request = require('../../utils/requests');
const video = require('../../videos');

Page({
  data: {
    loading: true
  },
  onLoad(params) {
    request.getRawVideoUrl(params.videoId, video.username, video.password)
      .then(res => {
        this.setData({
          videoUrl: 'https://' + res.data.files['mp4'].url,
          videoDesc: params.videoDesc,
          loading: false
        });
      });
  }
});