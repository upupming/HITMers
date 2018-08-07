/* global getApp wx Page*/
import event from '../../utils/event';
const config = require('../../config');
const Dialog = require('../../zan-ui/dialog/dialog');

let globalData = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,    // 月份
    day: new Date().getDate(),
    numOfShifts: 0,   // 已值班次数

    days_style: [],

    shiftsByDay: 
      Array.apply(null, {length: 32})
        .map(function () {
          return 0;
        }),
    selectedDay: -1,
    loading: true
  },

  dayClick(event) {
    // console.log(event);
    let days_style = this.data.days_style;
    days_style
      .splice(days_style.indexOf({
        month: 'current', day: this.data.selectedDay, background: '#66BB6A', color: 'white'
      }));
    days_style
      .push({
        month: 'current', day: event.detail.day, background: '#66BB6A', color: 'white'
      });
    this.setData({
      selectedDay: event.detail.day,
      days_style
    });
  },

  hasLogged() {
    let that = this;
    if (!globalData.logged) {
      Dialog({
        message: that.data.language.pleaseLogin,
        selector: '#please-login-dialog'
      });
      return false;
    }

    return true;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

    this.setLanguage();
    event.on('languageChanged', this, this.setLanguage);

    const days_count = new Date(this.data.year, this.data.month, 0).getDate();

    let days_style = new Array;
    // 初始化样式
    for (let i = 1; i <= days_count; i++) {
      days_style.push({
        month: 'current', day: i, color: 'white'
      });
    }

    // Set today's style
    days_style.push({
      month: 'current', 
      day: this.data.day, 
      color: 'white', 
      background: '#ef7a82'
    });

    // 获取已值班信息
    wx.request({
      url: config.service.getMonthlyUrl,
      method: 'GET',
      data: {
        stu_id: globalData.stuId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        // console.log('取得信息成功');
        // console.log(res);

        res.data.forEach(element => {
          // 根据取得的信息修改样式
          let day = new Date(element.date_time).getDate()
          // console.log(day);
          // 增加次数
          this.data.shiftsByDay[day]++;
          days_style.push({
            month: 'current',
            day: new Date(element.date_time).getDate(),
            color: 'white',
            background: '#49B1F5'
          });
        });
        let that = this;
        this.setData({
          days_style,
          numOfShifts: res.data.length,
          // 在这里更新页面数据
          shiftsByDay: that.data.shiftsByDay,
          loading: false
        });
      },
      fail: () => {
        // console.error(res);
      }
    });

    this.setData({
      monthStr: this.data.language.months[this.data.month - 1],  // 月份字符串
      dayStr: this.data.language.days[this.data.day - 1]
    });
  },

  onShow() {
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
  }
});