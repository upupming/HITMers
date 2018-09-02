let host = wx.getSystemInfoSync().model === 'iPhone 5' ? 
  'http://localhost:5757': 'https://hitmers-api.solotime.xyz';

let apiPath = `${host}/v1`;

var config = {
  env: 'dev',
  service: {
    host,

    login: `${apiPath}/login`,
    user: `${apiPath}/user`,
    userAll: `${apiPath}/user/all`
  }
};

module.exports = config;
