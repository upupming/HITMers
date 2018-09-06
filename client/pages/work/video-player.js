const request = require('../../utils/requests');
const video = require('../../videos');

Page({
  onLoad(params) {
    request.getRawVideoUrl(params.videoId, video.username, video.password)
      .then(res => {
        this.setData({
          videoUrl: res.data.files['mp4-mobile'].url,
          videoDesc: params.videoDesc
        });
      });
  }
});