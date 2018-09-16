import event from '../../utils/event';
const request = require('../../utils/requests');

Page({
  data: {
    jxlarr: [
      {'lhmc':'一区主楼','lhdm':'002'},
      {'lhmc':'电机楼','lhdm':'019'},
      {'lhmc':'机械楼','lhdm':'012'},
      {'lhmc':'正心楼','lhdm':'016'},
      {'lhmc':'致知楼','lhdm':'025'},
      {'lhmc':'格物楼','lhdm':'015'},
      {'lhmc':'诚意楼','lhdm':'027'},
      {'lhmc':'管理楼','lhdm':'022'},
      {'lhmc':'理学楼','lhdm':'018'},
      {'lhmc':'土木楼','lhdm':'006'},
      {'lhmc':'二区主楼','lhdm':'033'},
      {'lhmc':'东配楼','lhdm':'032'},
      {'lhmc':'西配楼','lhdm':'042'},
      {'lhmc':'车库楼','lhdm':'043'},
      {'lhmc':'交通学院','lhdm':'037'},
      {'lhmc':'青年公寓','lhdm':'044'}
    ],
    jxlmcarr: [
      '一区主楼',
      '电机楼',
      '机械楼',
      '正心楼',
      '致知楼',
      '格物楼',
      '诚意楼',
      '管理楼',
      '理学楼',
      '土木楼',
      '二区主楼',
      '东配楼',
      '西配楼',
      '车库楼',
      '交通学院',
      '青年公寓'
    ],
    jxlarrIndex: 3,
    selectedLHDM: '016',
    periods: [
      '1-2',
      '3-4',
      '5-6',
      '7-8',
      '9-10',
      '11-12'
    ],
    loading: true
  },

  onLoad: function () {
    this.setLanguage();
    event.on('languageChanged', this, this.setLanguage);

    this.onDayChange({
      detail: 0
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

  fetchRooms() {
    this.setData({loading: true});
    request.getKxjs(this.data.jxlarr[this.data.jxlarrIndex].lhdm, this.data.dayString)
      .then(res => {
        this.setData({
          jsArr: res.data.module.jsArr,
          kxjsArr: res.data.module.kxjsArr,
          isFree: this.fillInIsFreeArr(res.data.module.jsArr, res.data.module.kxjsArr),
          loading: false
        });
      });
  },

  onDayChange(event) {
    let day = new Date();
    day.setDate(day.getDate() + event.detail);
    let dayString = day.getFullYear() + '-' + (day.getMonth()+1) + '-' + day.getDate();
    this.setData({dayString, weekday: this.data.language.weekDays[day.getDay()]});
    this.fetchRooms();
  },



  changeBuilding(event) {
    this.setData({jxlarrIndex: event.detail.value});
    this.fetchRooms();
  },

  fillInIsFreeArr(jsArr, kxjsArr) {
    let isFree = {};
    jsArr.forEach(js => {
      isFree[js.cddm] = Array.apply(null, {length: 6}).map(() => true);
    });

    for(let kxjs of kxjsArr) {
      isFree[kxjs.cddm][kxjs.jc - 1] = false;
    }
    return isFree;
  },

  onShareAppMessage() {
    return {
      title: this.data.language.freeRomms,
      path: '/pages/learning/free-rooms'
    };
  }
});