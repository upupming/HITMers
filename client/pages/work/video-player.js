const request = require('../../utils/requests');
const video = require('../../videos');
const config = require('../../config');

Page({
  data: {
    loading: true
  },
  onLoad(params) {
    request.getRawVideoUrl(params.videoId, video.username, video.password)
      .then(res => {
        let url = res.data.files['mp4'].url;
        url.replace((new RegExp(config.service.streamCDN), 'gi'), config.service.streamCDNProxy);
        this.setData({
          videoUrl: 'https:' + url,
          videoDesc: params.videoDesc,
          loading: false
        });
      });
  }
});