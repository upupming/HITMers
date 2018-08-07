/* global getApp wx Page*/
import event from '../../utils/event';

const Dialog = require('../../zan-ui/dialog/dialog');
const config = require('../../config');
const util = require('../../utils/util');

var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;

//#region GLOAL_CONSTRAINT
//========= 地点约束
let TARGET_LATITUDE = 45.743099;
let TARGET_LONGITUDE = 126.635986;
let MAX_DISTANCE = 400;
//========= 时间约束
let SHIFT_PERIODS = [
  // 早班签到
  [
    8, 0, 24, 0
  ],
  // 早班签出
  [
    12, 0, 13, 0
  ],
  // 晚班签到
  [
    17, 0, 24, 0
  ],
  // 晚班签出
  [
    15, 30, 24, 0
  ]
];
//#endregion GLOAL_CONSTRAINT

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
      ('00' + this.endHours).slice(-2) + ':' + ('00' + this.endMinutes).slice(-2);
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
    // 取出缓存的签入/出信息
    this.setData({
      checkedIn: globalData.checkedIn
    });
    // 实例化腾讯地图 API 核心类
    qqmapsdk = new QQMapWX({
      key: 'FKLBZ-OH66W-N2ER5-RMVPT-4HINT-VWBDV',
    });

    // 设置签到/签出时间
    this.data.checkInMorning = new CheckPeriod(SHIFT_PERIODS[0][0], SHIFT_PERIODS[0][1], SHIFT_PERIODS[0][2], SHIFT_PERIODS[0][3], true, true);
    this.data.checkOutMorning = new CheckPeriod(SHIFT_PERIODS[1][0], SHIFT_PERIODS[1][1], SHIFT_PERIODS[1][2], SHIFT_PERIODS[1][3], false, true);
    this.data.checkInAfternoon = new CheckPeriod(SHIFT_PERIODS[2][0], SHIFT_PERIODS[2][1], SHIFT_PERIODS[2][2], SHIFT_PERIODS[2][3], true, false);
    this.data.checkOutAfternoon = new CheckPeriod(SHIFT_PERIODS[3][0], SHIFT_PERIODS[3][1], SHIFT_PERIODS[3][2], SHIFT_PERIODS[3][3], false, false);

    this.setLanguage();
    event.on('languageChanged', this, this.setLanguage);
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

  hasLogged() {
    let that = this;
    if (!globalData.logged) {
      Dialog({
        message: that.data.language.pleaseLogin,
        selector: '#please-login-dialog',
        buttons: [{
          text: that.data.language.confirm,
          color: '#49B1F5'
        }]
      });
      return false;
    }
    return true;
  },

  getShift() {
    let now = new Date();
    let that = this;

    // 签到
    if (!this.data.checkedIn) {
      if (this.data.checkInMorning.isInThisPeriod(now.getHours(), now.getMinutes())){
        // 早班
        return 1;
      } else if (this.data.checkInAfternoon.isInThisPeriod(now.getHours(), now.getMinutes())) {
        // 晚班
        return 2;
      } else {
        Dialog({
          title: that.data.language.notInPeriod,
          message: that.data.checkInMorning.toString() +
            '\n\n' + that.data.checkOutMorning.toString() +
            '\n\n' + that.data.checkInAfternoon.toString() +
            '\n\n' + that.data.checkOutAfternoon.toString(),
          selector: '#time-not-valid-dialog',
          buttons: [{
            text: that.data.language.confirm,
            color: '#49B1F5'
          }]
        });
        return false;
      }
    }
    // 签出
    else {
      if (this.data.checkOutMorning.isInThisPeriod(now.getHours(), now.getMinutes())){
        // 早班
        return 1;
      } else if (this.data.checkOutAfternoon.isInThisPeriod(now.getHours(), now.getMinutes())) {
        // 晚班
        return 2;
      } else {
        Dialog({
          title: that.data.language.notOutPeriod,
          message: that.data.checkInMorning.toString() +
            '\n\n' + that.data.checkOutMorning.toString() +
            '\n\n' + that.data.checkInAfternoon.toString() +
            '\n\n' + that.data.checkOutAfternoon.toString() + 
            '\n\n' + that.data.language.shallWeforcelyCheckOut,
          selector: '#time-not-valid-dialog',
          buttons: [{
            text: that.data.language.cancel,
            color: '#49B1F5',
            type: 'cancel'
          }, {
            text: that.data.language.checkOutForcely,
            color: '#f85',
            type: 'force'
          }]
        }).then(({ type }) => {
          if(type === 'force') {
            this.setData({
              checkedIn: false
            });
            globalData.checkedIn = false;
          }
        });
        return false;
      }
    }
  },

  isLocationValid() {
    let that = this;

    return new Promise(function (resolve) {
      qqmapsdk.calculateDistance({
        to: [{
          latitude: TARGET_LATITUDE,
          longitude: TARGET_LONGITUDE
        }],
        success: res => {
          // console.log(res.result.elements[0]);
          if (res.result.elements[0].distance > MAX_DISTANCE) {
            Dialog({
              title: that.data.language.tooFarFrom,
              message: that.data.language.pleaseArrive + ' ' + that.data.language.TARGET_POSITION,
              selector: '#location-not-valid-dialog',
              buttons: [{
                text: that.data.language.confirm,
                color: '#49B1F5'
              }]
            });
            resolve(false);
          } else {
            resolve(true);
          }
        },
        fail: res => {
          util.show(that.data.language.calDistanceFailed + ': ' + res.message, 'fail');
          resolve(false);
        }
      });
    });
  },

  checkInOrOut() {
    let that = this;
    CheckPeriod.setLanguage(this.data.language);

    let shift;
    if (this.hasLogged() && (shift = this.getShift())) {
      this.isLocationValid().then(
        res => {
          // console.log(res ? 'Constraints not met' : 'POSTing...');
          if (res) {
            wx.request({
              url: config.service.checkUrl,
              data: {
                wx_name: globalData.userInfo.nickName,
                stu_id: globalData.stuId,
                stu_name: globalData.stuName,
                check_in: that.data.checkedIn ? false : true,
                morning: shift === 1
              },
              method: 'POST',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function () {
                // console.log(res);
                util.show(that.data.checkedIn ? that.data.language.checkedOut : that.data.language.checkedIn, 'success');
                that.setData({
                  checkedIn: !that.data.checkedIn
                });
                globalData.checkedIn = that.data.checkedIn;
              },
              fail: function () {
                // console.log(res);
                util.show(that.data.language.requestError, 'fail');
              },
            });
          }
        }
      );
    }
  },

  monthly() {
    if(this.hasLogged()) {
      wx.navigateTo({
        url: './monthly'
      });
    }
  }
});