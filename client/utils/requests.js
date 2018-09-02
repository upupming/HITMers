/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
const request = wx.pro.request;
const service = require('../config').service;
import Notify from '../van-ui/notify/index';
import Toast from '../van-ui/toast/index';

const globalData = getApp().globalData;

function errorHandler(err) {
  console.error(err);
  Toast.clear();
  Notify(globalData.language.requestError + ': ' + JSON.stringify(err.errMsg));
}

function statusCodeChecker(res) {
  console.log(res);
  Toast.clear();
  if(res.statusCode === 200) {
    Notify({
      text: globalData.language.requestSuccess,
      backgroundColor: '#38f'
    });
  } else {
    Notify({
      text: globalData.language.requestError + ': ' + res.statusCode + ' ' + globalData.language[res.statusCode]
    });
    // Throw error with message from the server
    throw Error(res.data);
  }
  return res;
}

module.exports = {
  /**
   * Login and get a token. 
   */
  login(id, password) {
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: globalData.language.logining
    });
    return request({
      url: service.login,
      method: 'POST',
      data: {
        id,
        password
      }
    }).catch(errorHandler)
      .then(statusCodeChecker)
      .catch(() => {
        throw Error(globalData.language.loginFailed);
      });
  },

  getAllUsersInfo() {

  },
  /**
   * Get specific id user info using current token.
   */
  getUserInfo(id) {
    return request({
      url: service.user + '/' + id,
      method: 'GET',
      header: {
        'x-access-token': globalData.token
      }
    }).catch(errorHandler)
      .then(statusCodeChecker);
  },

  updateUser(id, user) {
    return request({
      url: service.user + '/' + id,
      method: 'PUT',
      header: {
        'x-access-token': globalData.token
      },
      data: user
    }).catch(errorHandler)
      .then(statusCodeChecker);
  }
};