const request = require('../../utils/requests');
const video = require('../../videos');
const config = require('../../config');

Page({
  data: {
    loading: true
  },
  onLoad(params) {
    this.setData(params);

    request.getRawVideoUrl(params.video_code, video.username, video.password)
      .then(res => {
        let url = res.data.files['mp4'].url;
        url = url.replace(config.service.streamCDN, config.service.streamCDNProxy);
        this.setData({
          videoUrl: 'https:' + url,
          loading: false
        });
      });
  }
});