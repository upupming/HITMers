import event from '../../utils/event';
import '../../utils/wxPromise.min.js';
const util = require('../../utils/util');
const config = require('../../config');
const Dialog = require('../../zan-ui/dialog/dialog');

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

let globalData = getApp().globalData;

Page({

  data: {
    language: '',
    loading: true,
    // Today's index
    // 0: Sunday ... 6: Saturday
    weekDayIndex: 0,
    // This week's month indices
    monthIndices: [],
    // This week's date indices
    dayIndices: [],
    complement: [],

    showFillInSheetPopup: false,
    selectedDayIndex: 0,
    selectedPeriod: '',
    filledStatus: '',
    statusIndex: 0,
    statuses: ['working', 'waiting', 'studying'],

    // anchor
    windowHeight: 0,
    toView: ''
  },

  onLoad() {
    this.getWeight();

    this.setLanguage();
    event.on('languageChanged', this, this.setLanguage);

    this.setDates();

    this.fetchShifts();

    this.setComplement();
  },

  getWeight() {
    wx.pro.getSystemInfo()
      .then(res => {
        this.setData({
          windowHeight: res.windowHeight
        });
      });
  },

  onPullDownRefresh() {
    this.fetchShifts();
  },

  setComplement() {
    let complement = [];
    for(let i=0; i<6; i++) {
      complement[i] = new Array(6 - i);
    }
    this.setData({
      complement
    });
  },

  setDates() {
    let now = new Date();
    let weekDayIndex = now.getDay();
    let monthIndices = [], dayIndices = [];
    let beforeToday = weekDayIndex+1, afterToday = weekDayIndex;
    while(beforeToday-- > 0) {
      let day = now.addDays(beforeToday - weekDayIndex);
      // 0: Jun., ..., 11: Dec.
      monthIndices[beforeToday] = day.getMonth();
      // 0: 1st, ..., 30: 31th
      dayIndices[beforeToday] = day.getDate() - 1;
    }
    while(++afterToday < 7) {
      let day = now.addDays(afterToday - weekDayIndex);
      monthIndices[afterToday] = day.getMonth();
      dayIndices[afterToday] = day.getDate() - 1;
    }
    this.setData({
      weekDayIndex,
      monthIndices,
      dayIndices
    });
  },

  // Get shifts information
  fetchShifts() {
    let that = this;
    wx.pro.request({
      url: config.service.shiftsUrl,
      method: 'GET',
      data: {
        startMonth: that.data.monthIndices[0] + 1,
        startDay: that.data.dayIndices[0] + 1,
        endMonth: that.data.monthIndices[6] + 1,
        endDay: that.data.dayIndices[6] + 1
      }
    }).then(res => {
      this.setData({
        shifts: res.data,
        loading: false,
        scrollTop: that.data.scrollTop || 0,
        scrollLeft: that.data.scrollLeft || 0
      });
    });
  },

  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
    this.data.shouldChangeTitle = true;
  },

  onShow() {
    if (this.data.shouldChangeTitle) {
      wx.T.setNavigationBarTitle();
      this.data.shouldChangeTitle = false;
    }
  },

  // Fill in sheet
  fillInSheet(event) {
    let dataset =  event.currentTarget.dataset;
    this.setData({
      selectedDayIndex: dataset.dayIndex,
      selectedPeriod: dataset.period,
      showFillInSheetPopup: true,
      toView: event.currentTarget.id
    });
  },
  submitShift() {
    this.toggleFillInSheetPopup();
    let data = this.data;
    wx.pro.request({
      url: config.service.shiftsUrl,
      method: 'POST',
      data: {
        stu_id: globalData.stuId,
        month: data.monthIndices[data.selectedDayIndex] + 1,
        day: data.dayIndices[data.selectedDayIndex] + 1,
        morning: data.selectedPeriod === 'morning' ? 1 : 0,
        status: data.statuses[data.statusIndex]
      }
    }).then(res => {
      if(res.statusCode === 200) {
        util.show(data.language.fillInSheetSuccess, 'success');    
        this.setData({
          loading: true
        });
        this.fetchShifts();
      } else if(res.statusCode === 403) {
        util.show(data.language.fillInSheetForbidden, 'fail');
      }
    }).catch(err => {
      util.show(data.language.requestError + ': ' + err, 'fail');
    });
  },
  abandonShift() {
    this.setData({
      showFillInSheetPopup: false
    });
  },
  changeStatus(event) {
    this.setData({
      statusIndex: event.detail.value
    });
  },
  toggleFillInSheetPopup() {
    this.setData({
      showFillInSheetPopup: !this.data.showFillInSheetPopup
    });
  },
  deleteShift(event) {
    // Cannot delete others' shift
    if(event.currentTarget.dataset.phoneNumber !== globalData.loginResponse.phone_number) {
      // Add shift instead
      this.fillInSheet(event);
      return;
    }

    this.setData({
      toView: event.currentTarget.id
    });

    let data = this.data;
    Dialog({
      title: data.language.deleteShift,
      message: data.language.confirmDeleteShift,
      selector: '#delete-shift-dialog',
      buttons: [
        {
          text: data.language.cancel,
          color: '#ff5811',
          type: 'cancel'
        },
        {
          text: data.language.confirm,
          color: '#49B1F5',
          type: 'confirm'
        }
      ]
    }).then(({type}) => {
      if(type === 'confirm') {
        wx.pro.request({
          // DELETE should use query string, not request body
          url: config.service.shiftsUrl + `?shift_id=${event.currentTarget.dataset.shiftId}`,
          method: 'DELETE'
        }).then(res => {
          if(res.statusCode === 200) {
            util.show(data.language.deleteShiftSuccess, 'success');    
            this.setData({
              loading: true
            });
            this.fetchShifts();
          } else if(res.statusCode === 403) {
            util.show(data.language.deleteShiftForbidden, 'fail');
          }
        }).catch(err => {
          util.show(data.language.requestError + ': ' + err, 'fail');
        }); 
      }
    });
  },

  saveClickPosition(event) {
    this.data.scrollTop = event.detail.y;
    this.data.scrollLeft = event.detail.x;
  }
});