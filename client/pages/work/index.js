import event from '../../utils/event'

const Dialog = require('../../zan-ui/dialog/dialog');
const config = require('../../config');
const util = require('../../utils/util');

var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;

let MAX_DISTANCE = 400;
let globalData = getApp().globalData;

class CheckPeriod {
  constructor(startHours, startMinutes, endHours, endMinutes, isIn, isMorning) {
    this.startHours = startHours;
    this.startMinutes = startMinutes;
    this.endHours = endHours;
    this.endMinutes = endMinutes;

    this.isIn = isIn;
    this.isMorning = isMorning;
  }

  isInThisPeriod(hours, minutes) {
    if (hours > this.startHours && hours < this.endHours) {
      return true;
    } else if (hours === this.startHours) {
      return minutes > this.startMinutes;
    } else if (hours === this.endHours) {
      return minutes < this.endMinutes;
    } else {
      return false;
    }
  }

  toString() {
    return (this.isMorning ? this.language.morningShift : this.language.afternoonShift) +
      ' ' + (this.isIn ? this.language.checkIn : this.language.checkOut) +
      ' ' + this.language.period +
      '\n' +
      ' ' + ('00' + this.startHours).slice(-2) + ':' + ('00' + this.startMinutes).slice(-2) +
      ' - ' +
      ('00' + this.endHours).slice(-2) + ':' + ('00' + this.endMinutes).slice(-2)
  }

  static setLanguage(language) {
    CheckPeriod.prototype.language = language;
  }
}

Page({
  data: {
    language: '',
    signedInTimes: 0,
    checkedIn: false
  },
  onLoad: function () {
    // 实例化腾讯地图 API 核心类
    qqmapsdk = new QQMapWX({
      key: 'FKLBZ-OH66W-N2ER5-RMVPT-4HINT-VWBDV',
    });

    // 设置签到/签出时间
    this.data.checkInMorning = new CheckPeriod(8, 0, 9, 0, true, true);
    this.data.checkOutMorning = new CheckPeriod(12, 0, 13, 0, false, true);
    this.data.checkInAfternoon = new CheckPeriod(12, 0, 24, 0, true, false);
    this.data.checkOutAfternoon = new CheckPeriod(15, 30, 18, 30, false, false);

    this.setLanguage();
    event.on("languageChanged", this, this.setLanguage);
  },
  onShow: function () {
    if (this.data.shouldChangeTitle) {
      wx.T.setNavigationBarTitle();
      this.data.shouldChangeTitle = false;
    }
  },
  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
    this.data.shouldChangeTitle = true;
  },

  hasUserInfo() {
    let that = this;
    if (globalData.userInfo === null) {
      Dialog({
        message: that.data.language.pleaseLogin,
        selector: '#please-login-dialog'
      });
      return false;
    }
    return true;
  },

  isTimeValid() {
    let now = new Date();

    // 签到
    if (!this.data.checkedIn) {
      if (this.data.checkInMorning.isInThisPeriod(now.getHours(), now.getMinutes()) || this.data.checkInAfternoon.isInThisPeriod(now.getHours(), now.getMinutes())) {
        return now;
      } else {
        Dialog({
          title: that.data.language.notInPeriod,
          message: that.data.checkInMorning.toString() +
            '\n\n' + that.data.checkOutMorning.toString() +
            '\n\n' + that.data.checkInAfternoon.toString() +
            '\n\n' + that.data.checkOutAfternoon.toString(),
          selector: "#time-not-valid-dialog"
        });
        return false;
      }
    }
    // 签出
    else {
      if (this.data.checkOutMorning.isInThisPeriod(now.getHours(), now.getMinutes()) || this.data.checkOutAfternoon.isInThisPeriod(now.getHours(), now.getMinutes())) {
        return now;
      } else {
        Dialog({
          title: that.data.language.notOutPeriod,
          message: that.data.checkInMorning.toString() +
            '\n\n' + that.data.checkOutMorning.toString() +
            '\n\n' + that.data.checkInAfternoon.toString() +
            '\n\n' + that.data.checkOutAfternoon.toString(),
          selector: "#time-not-valid-dialog"
        });
        return false;
      }
    }
  },

  isLocationValid() {
    let that = this;

    let targetPosition = 'A02 公寓 4 楼自习室';
    let targetLatitude = 45.74326;
    let targetLongitude = 126.635765;

    return new Promise(function (resolve) {
      qqmapsdk.calculateDistance({
        to: [{
          latitude: targetLatitude,
          longitude: targetLongitude
        }],
        success: res => {
          console.log(res.result.elements[0]);
          if (res.result.elements[0].distance > MAX_DISTANCE) {
            Dialog({
              title: that.data.language.tooFarFrom,
              message: that.data.language.pleaseArrive + ' ' + targetPosition,
              selector: "#location-not-valid-dialog"
            });
            resolve(false);
          } else {
            resolve(true);
          }
        },
        fail: res => {
          util.showModel(language.calDistanceFailed);
          console.log(res);
          resolve(false);
        }
      });
    });
  },

  checkInOrOut() {
    let that = this;
    CheckPeriod.setLanguage(this.data.language);

    if (this.hasUserInfo() && this.isTimeValid()) {
      this.isLocationValid().then(
        res => {
          console.log(res);
          if (res) {
            wx.request({
              url: config.service.checkUrl,
              data: {
                wx_id: globalData.userInfo.nickName,
                check_in: that.data.checkedIn ? false : true,
                check_out: that.data.checkedIn ? true : false
              },
              method: 'POST',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                console.log(res);
                util.showSuccess(that.data.checkedIn ? that.data.language.checkedOut : that.data.language.checkedIn);
              },
              fail: function (res) {
                console.log(res);
                util.showModel(that.data.language.requestError);
              },
            })
          }
        }
      );
    }
  }
});