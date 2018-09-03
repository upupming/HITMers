let host;
let env = 'dev';

if(env === 'production') {
  host = 'https://hitmers-api.solotime.xyz';
} else {
  host = wx.getSystemInfoSync().model === 'iPhone 5' ? 'http://localhost:5757': 'https://hitmers-api.solotime.xyz';
}

let apiPath = `${host}/v1`;

var config = {
  env: env,
  service: {
    host,

    login: `${apiPath}/login`,
    user: `${apiPath}/user`,
    userAll: `${apiPath}/user/all`,
    check: `${apiPath}/check`,
    shift: `${apiPath}/shift`
  }
};

module.exports = config;
