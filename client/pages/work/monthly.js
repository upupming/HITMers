import event from '../../utils/event';
const Dialog = require('../../zan-ui/dialog/dialog');
const request = require('../../utils/requests');

// globalData.notes[0][0][1] 表示
// 2018 年 1 月 1 日的日记 
const NOTES_START_YEAR = 2018;
let globalData = getApp().globalData;

Page({
  data: {
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth(),    // 月份，0 为 1 月
    day: new Date().getDate(),  // 日期，1 为 1 日
    numOfTotalShifts: 0,   // 总值班次数
    numOfFinishedShifts: 0,   // 已值班次数

    days_style: [],

    // 忽略 [0]，从 [1] 开始索引
    finishedShiftsByDay: [],
    totalShiftsByDay: [],
    selectedYear: -1,
    selectedMonth: -1,
    selectedDay: -1,
    loading: true,

    notes: [],
    notesStartYear: NOTES_START_YEAR
  },

  noteChanged(event) {
    this.data.notes[this.data.selectedYear - NOTES_START_YEAR][this.data.selectedMonth][parseInt(event.currentTarget.id.substring(9))] = event.detail;
    this.setData({
      notes: this.data.notes
    });
  },

  dayClick(event) {
    let days_style = this.data.days_style;
    let selectedStyleIndex = -1;
    selectedStyleIndex = days_style.indexOfSameValue({
      month: 'current', 
      day: this.data.selectedDay, 
      color: 'white',
      background: '#66BB6A'      
    });
    if(selectedStyleIndex != -1) {
      days_style.splice(selectedStyleIndex);
    }
    days_style
      .push({
        month: 'current', 
        day: event.detail.day, 
        color: 'white',
        background: '#66BB6A',
        
      });
    this.setData({
      selectedDay: event.detail.day,
      days_style,
      notes: this.data.notes
    });
  },

  closeSelected() {
    let days_style = this.data.days_style;
    days_style
      .splice(days_style.indexOfSameValue({
        month: 'current', 
        day: this.data.selectedDay, 
        background: '#66BB6A', 
        color: 'white'
      }));
    // 回到今天
    days_style.push({
      month: 'current',
      day: this.data.day,
      color: 'white',
      background: '#66BB6A'
    });
    this.setData({
      selectedDay: -1,
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

  resetMonthlyShifts() {
    this.data.totalShiftsByDay = Array.apply(null, {length: 32}).map(() => 0);
    this.data.finishedShiftsByDay = Array.apply(null, {length: 32}).map(() => 0);
    this.data.numOfFinishedShifts = 0;
  },

  /**
   * Set styles of calender.
   * @param {number} year 
   * @param {number} month 0: Jan., 1: Feb., ...
   */
  setDaysStyle(year, month) {
    this.resetMonthlyShifts();
    this.initiateGlobalNotes();

    const days_count = new Date(year, month, 0).getDate();

    let days_style = new Set();
    // 初始化样式
    for (let i = 1; i <= days_count; i++) {
      days_style.add({
        month: 'current', day: i, color: 'white'
      });
    }

    Promise.all([
      // 获取当月总的值班信息
      request.getShiftsById(globalData.stuId, {
        year: year,
        startMonth: month + 1,
        startDay: 1,
        endMonth: month + 1,
        endDay: days_count
      }).then(res => {
        res.data.forEach(element => {
          this.data.totalShiftsByDay[element.day]++;
          days_style.add({
            month: 'current',
            day: element.day,
            color: 'white',
            background: '#ef7a82'
          });
        });
        this.data.numOfTotalShifts = res.data.length;
      }),
      // 获取已值班信息
      request.getMonthlyChecks(globalData.stuId, year, month)
        .then(res => {
          res.data.forEach(element => {
            // 根据取得的信息修改样式
            let day = new Date(element.date_time).getDate();
            // 增加次数
            this.data.finishedShiftsByDay[day]++;
            days_style.add({
              month: 'current',
              day: new Date(element.date_time).getDate(),
              color: 'white',
              background: '#49B1F5'
            });
            this.data.numOfFinishedShifts = res.data.length;
          });
        })
    ]).then(() => {
      // Set today's style
      if(month == this.data.month) {
        days_style.add({
          month: 'current',
          day: this.data.day,
          color: 'white',
          background: '#66BB6A'
        });
      }

      this.setData({
        days_style: Array.from(days_style),
        numOfFinishedShifts: this.data.numOfFinishedShifts,
        numOfTotalShifts: this.data.numOfTotalShifts,
        finishedShiftsByDay: this.data.finishedShiftsByDay,
        totalShiftsByDay: this.data.totalShiftsByDay,
        loading: false,
        selectedDay: month === this.data.month ? this.data.day : -1
      });
    });
  },

  initiateGlobalNotes() {    
    if(!globalData.notes) {
      globalData.notes = [];
    }
    if(!globalData.notes[this.data.selectedYear - NOTES_START_YEAR]){
      globalData.notes[this.data.selectedYear - NOTES_START_YEAR] = [];
    }
    if(!globalData.notes[this.data.selectedYear - NOTES_START_YEAR][this.data.selectedMonth]) {
      globalData.notes[this.data.selectedYear - NOTES_START_YEAR][this.data.selectedMonth] = [];
    }
    this.setData({
      // Delegate to globalData.notes
      notes: globalData.notes
    });
  },

  refreshCalenderTo(year, month) {
    this.setData({
      loading: true,
      selectedYear: year,
      selectedMonth: month,
      selectedDay: -1,
      notes: this.data.notes
    });
    this.setDaysStyle(year, month);
  },

  backToCurrentMonth() {
    this.refreshCalenderTo(this.data.year, this.data.month);
  },

  monthChangedHandler(event) {
    this.refreshCalenderTo(event.detail.currentYear, event.detail.currentMonth - 1);
  },

  onLoad() {
    this.setLanguage();
    event.on('languageChanged', this, this.setLanguage);

    this.setData({
      monthStr: this.data.language.months[this.data.month], 
      dayStr: this.data.language.days[this.data.day - 1],
      selectedYear: this.data.year,
      selectedMonth: this.data.month
    });

    this.setDaysStyle(this.data.year, this.data.month);
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