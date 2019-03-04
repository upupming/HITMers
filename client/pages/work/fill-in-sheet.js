import event from '../../utils/event';
import '../../utils/wxPromise.min.js';
const util = require('../../utils/util');
const Dialog = require('../../zan-ui/dialog/dialog');
import vanDialog from '../../van-ui/dialog/dialog';
const request = require('../../utils/requests');
import Toast from '../../van-ui/toast/toast';
const config = require('../../config');

let globalData = getApp().globalData;
let tapEvent;

Page({

  data: {
    language: '',
    loading: true,
    // Today's index
    // 0: Sunday ... 6: Saturday
    weekDayIndex: 0,
    // This week's year indices
    yearIndices: [],
    // This week's month indices
    monthIndices: [],
    // This week's date indices
    dayIndices: [],
    complement: [],
    weekOffset: 0,

    showFillInSheetPopup: false,
    selectedDayIndex: 0,
    selectedPeriod: '',
    filledStatus: '',
    statusIndex: 0,
    statuses: ['working', 'waiting', 'studying'],

    showRules: false,
    currentView: 'shifts',
    toView: 'today',
    termInfo: config.date.termInfo[globalData.langIndex]
  },

  onLoad() {
    this.setLanguage();
    event.on('languageChanged', this, this.setLanguage);

    this.setWindowHeight();

    this.setDates();

    this.fetchShifts();

    this.setComplement();
  },

  setWindowHeight() {
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    });
  },

  getRules() {
    return request.getNotices()
      .then(res => {
        if(res.statusCode === 200) {
          let notices = res.data;
          let rules;
          for(let notice of notices) {
            if(notice.subject.includes('值班规则')) {
              rules = notice.content;
              break;
            }
          }
          if(rules) {
            this.setData({
              rules
            });
          }
        }
      });
  },

  onPullDownRefresh() {
    if(this.data.currentView === 'shifts') {
      this.fetchShifts();
    } else {
      this.fetchVisitors();
    }
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

  getWeekNum(date) {
    return Math.floor((date - config.date.termStartDate) / (7 * 24 * 60 * 60 * 1000)) + 1;
  },

  getWeekNumString(weekNum) {
    return globalData.langIndex == 1 ? `Week ${weekNum}` : `第 ${weekNum} 周`;
  },

  setDates(weekOffsetToBeAdded) {
    this.data.weekOffset += weekOffsetToBeAdded || 0;
    let currentWeekNow = new Date().addDays(this.data.weekOffset * 7);
    let weekDayIndex = currentWeekNow.getDay();
    let yearIndices = [], monthIndices = [], dayIndices = [];
    let beforeToday = weekDayIndex+1, afterToday = weekDayIndex;
    while(beforeToday-- > 0) {
      let day = currentWeekNow.addDays(beforeToday - weekDayIndex);
      yearIndices[beforeToday] = day.getFullYear();
      // 0: Jun., ..., 11: Dec.
      monthIndices[beforeToday] = day.getMonth();
      // 0: 1st, ..., 30: 31th
      dayIndices[beforeToday] = day.getDate() - 1;
    }
    while(++afterToday < 7) {
      let day = currentWeekNow.addDays(afterToday - weekDayIndex);
      yearIndices[afterToday] = day.getFullYear();
      monthIndices[afterToday] = day.getMonth();
      dayIndices[afterToday] = day.getDate() - 1;
    }
    this.setData({
      weekDayIndex : this.data.weekOffset === 0 ? weekDayIndex : -1,
      yearIndices,
      monthIndices,
      dayIndices,
      weekNum: this.getWeekNum(currentWeekNow),
      weekNumString: this.getWeekNumString(this.getWeekNum(currentWeekNow))
    });
  },

  // Get shifts information
  fetchShifts() {
    this.setData({loading: true});
    this.getRules().then(() => {
      return request.getShifts({
        year: this.data.yearIndices[0],
        startMonth: this.data.monthIndices[0] + 1,
        startDay: this.data.dayIndices[0] + 1,
        endMonth: this.data.monthIndices[6] + 1,
        endDay: this.data.dayIndices[6] + 1
      }).then(res => {
        if(res.statusCode === 200) {
          this.setData({
            shifts: res.data,
            loading: false,
            currentView: 'shifts'
          });
        } 
      }).catch(() => {
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 1500);
      });
    });
  },
  // Get visitors information
  fetchVisitors() {
    this.setData({loading: true});
    return request.getVisitors({
      startDateTime: `${new Date().getFullYear()}-${this.data.monthIndices[0]+1}-${this.data.dayIndices[0]+1} 8:00:00`,
      endDateTime: `${new Date().getFullYear()}-${this.data.monthIndices[6]+1}-${this.data.dayIndices[6]+1} 24:00:00`
    }).then(res => {
      if(res.statusCode === 200) {
        res.data = this.toString(res.data);
        this.setData({
          visitors: res.data,
          loading: false,
          currentView: 'visitors'
        });
      }
    });
  },
  toString(visitorsArray) {
    for(let dayVisitors of visitorsArray) {
      for (let periodVisitors of dayVisitors) {
        for (let visitor of periodVisitors) {
          visitor.detail = this.visitorToString(visitor);
          visitor.summary = this.visitorToSummaryString(visitor);
        }
      }
    }
    return visitorsArray;
  },
  visitorToString(visitor) {
    return `${this.visitorToSummaryString(visitor)}
    ${this.data.language.appointer + ': ' + visitor.appointer + ' ' + visitor.appointer_phone_number}
    ${this.data.language.guide + ': ' + (visitor.guide || this.data.language.null)}
    ${this.data.language.comment + ': ' + (visitor.comment || this.data.language.null)}`;
  },
  visitorToSummaryString(visitor) {
    return `${util.getHourMinutes(visitor.arriving) + ' ' + visitor.number_of_people + this.data.language.people}
    ${visitor.identity}`;
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
      showFillInSheetPopup: true
    });
  },
  submitShift() {
    this.toggleFillInSheetPopup();
    let data = this.data;
    request.addShift(
      globalData.stuId, 
      data.yearIndices[data.selectedDayIndex],
      data.monthIndices[data.selectedDayIndex] + 1, 
      data.dayIndices[data.selectedDayIndex] + 1,
      data.selectedPeriod === 'morning',
      data.statuses[data.statusIndex]
    ).then(res => {
      if(res.statusCode === 200) {
        util.show(data.language.fillInSheetSuccess, 'success');
        this.fetchShifts();
      }
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

  seeVisitor(event) {
    vanDialog.alert({
      title: this.data.language.visitorInfo,
      message: event.currentTarget.dataset.visitorDetail,
      confirmButtonText: this.data.language.confirm,
    });
  },

  setActions(event) {
    this.setData({
      actions: [
        {name: event.currentTarget.dataset.shiftDetail, disabled: true},
        {name: '➕'}
      ]
    });
  },

  toggleActionChooser() {
    this.setData({
      showActionChooser: !this.data.showActionChooser
    });
  },

  seeDetail(event) {
    this.setActions(event);
    this.toggleActionChooser();
    tapEvent = event;
  },

  onSelectedAction(event) {
    if(event.detail.name === '➕'){
      this.toggleActionChooser();
      this.fillInSheet(tapEvent);
    }
  },

  deleteShift(event) {
    // Cannot delete others' shift
    if(event.currentTarget.dataset.phoneNumber !== globalData.user.phone_number) {
      // See shift detail, add shift if user wants to
      this.seeDetail(event);
      return;
    }

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
        request.deleteShift(event.currentTarget.dataset.shiftId)
          .then(res => {
            if(res.statusCode === 200) {
              util.show(data.language.deleteShiftSuccess, 'success');
              this.fetchShifts();
            }
          });
      }
    });
  },

  closeRules() {
    this.setData({
      showRules: false
    });
  },
  showRules() {
    this.setData({
      showRules: true
    });
  },

  getHTML() {
    let headHTML = `<head>
      <style>
        html {
          font-family: Baskerville, Georgia, "Liberation Serif", "Kaiti SC", STKaiti, "AR PL UKai CN", "AR PL UKai HK", "AR PL UKai TW", "AR PL UKai TW MBE", "AR PL KaitiM GB", KaiTi, KaiTi_GB2312, DFKai-SB, "TW-Kai", serif;
          background-color: white;
        }

        table {
          border-collapse: collapse;
          border: 10px solid #969A97;
          letter-spacing: 1px;
          font-size: 2rem;
          background: white;
          margin-top: 3em;
          width: 90%;
        }

        td, th {
          border: 1px solid #969A97;
          padding: 10px 20px;
        }

        td {
          text-align: center;
        }

        caption {
          padding: 10px;
        }

        .working {
          background: #66BB6A;
        }
        
        .waiting {
          background: #ef7a82;
        }
        
        .studying {
          background: #99d3f9;
        }

        .day-date, .day-date+tr {
          font-weight: bold;
          border-top: 5px solid #969A97;
          color: #969A97;
        }
        tr:first-child {
          color: #969A97;
        }
        td {
          color: black;
        }

        .heart {
          color: #FF4500;
        }
        .love {
          font-style: italic;
          margin: 5em;
          font-size: 1rem;
        }
      </style>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    </head>`;

    let tableOpeningHTML = `<body>
      <center>
        <img src="https://raw.githubusercontent.com/upupming/HITMers/dev/client/images/logo.png" height="180px"/>
          <h1>${this.data.language.HITMuseum + ' ' + this.data.termInfo + ' ' + this.data.weekNumString + ' ' + this.data.language.sheet}</h1><table>
    `;
    let tableClosingHTML = `</table>
        <p class="love">Made with <i class="fas fa-heart heart"></i> by upupming@HIT Museum</p>
      </center>
    <body>
    `;

    let sheetHTML = `<tr>
      <th>${this.data.language.sheet}</th>
      <th>${this.data.language.morning}</th>
      <th>${this.data.language.afternoon}</th>
    </tr>`;

    for (let dayIndex = 0; dayIndex < this.data.shifts.length; dayIndex++) {
      // For empty day
      if(this.data.shifts[dayIndex][0].length === 0 && this.data.shifts[dayIndex][1].length === 0) {
        sheetHTML += `<tr class="day day-date">
          <th>${this.data.language.months[this.data.monthIndices[dayIndex]] + ' ' + this.data.language.days[this.data.dayIndices[dayIndex]] + ' ' + this.data.language.weekDays[dayIndex]}</th>
          <td class="morning">&nbsp;</td>
          <td class="afternoon">&nbsp;</td>
        </tr>`;
      }
      
      // Morning shifts less than afternoon shifts
      else if(this.data.shifts[dayIndex][0].length < this.data.shifts[dayIndex][1].length) {
        let dayRowspan = this.data.shifts[dayIndex][1].length;
        let commonSpan = this.data.shifts[dayIndex][0].length;

        sheetHTML += `<tr class="day day-date">
          <th rowspan="${dayRowspan+1}">${this.data.language.months[this.data.monthIndices[dayIndex]] + ' ' + this.data.language.days[this.data.dayIndices[dayIndex]] + ' ' + this.data.language.weekDays[dayIndex]}</th>
        </tr>`;
        // Morning shifts and equal size afternoon shifts
        for(let i=0; i<commonSpan; i++) {
          let morningGuide = this.data.shifts[dayIndex][0][i];
          let afternoonGuide = this.data.shifts[dayIndex][1][i];
          sheetHTML += `<tr><td class="morning ${morningGuide.status}">${morningGuide.name + ' ' + morningGuide.phone_number + ' ' + morningGuide.language + ' ' + morningGuide.session}</td>
          <td class="afternoon ${afternoonGuide.status}">${afternoonGuide.name + ' ' + afternoonGuide.phone_number + ' ' + afternoonGuide.language + ' ' + afternoonGuide.session}</td></tr>`;
        }
        // Extra afternoon shifts
        for(let i=commonSpan; i<dayRowspan; i++) {
          let afternoonGuide = this.data.shifts[dayIndex][1][i];
          sheetHTML += `<tr><td class="morning"></td>
          <td class="afternoon ${afternoonGuide.status}">${afternoonGuide.name + ' ' + afternoonGuide.phone_number + ' ' + afternoonGuide.language + ' ' + afternoonGuide.session}</td></tr>`;
        }
      }
      // Morning shifts more than afternoon shifts
      else {
        let dayRowspan = this.data.shifts[dayIndex][0].length;
        let commonSpan = this.data.shifts[dayIndex][1].length;

        sheetHTML += `<tr class="day day-date">
          <th rowspan="${dayRowspan+1}">${this.data.language.months[this.data.monthIndices[dayIndex]] + ' ' + this.data.language.days[this.data.dayIndices[dayIndex]] + ' ' + this.data.language.weekDays[dayIndex]}</th>
        </tr>`;
        // Morning shifts and equal size afternoon shifts
        for(let i=0; i<commonSpan; i++) {
          let morningGuide = this.data.shifts[dayIndex][0][i];
          let afternoonGuide = this.data.shifts[dayIndex][1][i];
          sheetHTML += `<tr><td class="morning ${morningGuide.status}">${morningGuide.name + ' ' + morningGuide.phone_number + ' ' + morningGuide.language + ' ' + morningGuide.session}</td>
          <td class="afternoon ${afternoonGuide.status}">${afternoonGuide.name + ' ' + afternoonGuide.phone_number + ' ' + afternoonGuide.language + ' ' + afternoonGuide.session}</td></tr>`;
        }
        // Extra morning shifts
        for(let i=commonSpan; i<dayRowspan; i++) {
          let morningGuide = this.data.shifts[dayIndex][0][i];
          sheetHTML += `<tr><td class="morning ${morningGuide.status}">${morningGuide.name + ' ' + morningGuide.phone_number + ' ' + morningGuide.language + ' ' + morningGuide.session}</td>
          <td class="afternoon"></td></tr>`;
        }
      }
    }

    let html = headHTML + tableOpeningHTML + sheetHTML + tableClosingHTML;
    return html;
  },

  getFilePath(isImage) {
    let now = new Date();
    let thisMonday = now.addDays(1 - now.getDay());
    thisMonday.setHours(0, 0, 0);
    let filename = util.getDateString(thisMonday);
    let filePath = `${wx.env.USER_DATA_PATH}/${this.data.language.sheet}@${filename}.${isImage ? 'png' : 'pdf'}`;
    return filePath;
  },

  saveToPDF() {
    let html = this.getHTML();
    let filePath = this.getFilePath();

    request.getPDFByHTML(html)
      .then(res => {
        let fileManager = wx.getFileSystemManager();
        
        fileManager.writeFile({
          filePath: filePath,
          data: res.data,
          encoding: 'binary',
          success: (result)=>{
            if(result.errMsg === 'writeFile:ok'){
              Toast.clear();
              vanDialog.confirm({
                title: this.data.language.saved,
                message: this.data.language.willYouOpenIt,
                confirmButtonText: this.data.language.confirm,
                cancelButtonText: this.data.language.cancel
              }).then(this.openPDF);
            } else {
              util.show(this.data.language.savingFailed, 'fail');  
            }
          },
          fail: () => {
            Toast.clear();
            util.show(this.data.language.savingFailed, 'fail');
          }
        });
      });
  },

  saveToImage() {
    let html = this.getHTML();
    let filePath = this.getFilePath(true);

    request.getImageByHTML(html)
      .then(res => {
        let fileManager = wx.getFileSystemManager();
        
        fileManager.writeFile({
          filePath: filePath,
          data: res.data,
          encoding: 'binary',
          success: (result)=>{
            if(result.errMsg === 'writeFile:ok'){
              Toast.clear();
              vanDialog.confirm({
                title: this.data.language.saved,
                message: this.data.language.willYouOpenIt,
                confirmButtonText: this.data.language.confirm,
                cancelButtonText: this.data.language.cancel
              }).then(this.openImage);
            } else {
              util.show(this.data.language.savingFailed, 'fail');  
            }
          },
          fail: () => {
            Toast.clear();
            util.show(this.data.language.savingFailed, 'fail');
          }
        });
      });
  },

  openImage() {
    wx.previewImage({
      urls: [
        this.getFilePath(true)
      ] 
    });
  },

  openPDF() {
    wx.openDocument({
      filePath: this.getFilePath(),
      fileType: 'pdf',
      fail: () => {
        util.show(this.data.language.fileNotExists, 'fail');
      }
    });
  },

  toggleInfo() {
    vanDialog.alert({
      title: this.data.language.aboutFile,
      message: this.data.language.pdfFileDeatil
    });
  },

  onShareAppMessage() {
    return {
      title: this.data.language.fillInSheet,
      path: '/pages/work/fill-in-sheet'
    };
  },

  changeView() {
    if(this.data.currentView === 'shifts') {
      this.fetchVisitors();
    } else {
      this.fetchShifts();
    }
  },

  changeWeek(event) {
    let weekToBeAdd = event.currentTarget.dataset.arrow === 'left' ? -1 : 1;
    this.setDates(weekToBeAdd);
    this.onPullDownRefresh();
  }
});