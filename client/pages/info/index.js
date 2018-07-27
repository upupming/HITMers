import event from '../../utils/event'

let globalData = getApp().globalData;

Page({
  data: {
    stuId: 1234567890,
    stuName: '张三'
  },

  readGlobalData() {
    this.setData({
      stuId: globalData.stuId,
      stuName: globalData.stuName
    });
  },

  onLoad() {
    this.readGlobalData();

    this.setLanguage();
    event.on("languageChanged", this, this.setLanguage);
  },
  onShow: function () {
    if (this.data.shouldChangeTitle) {
      wx.T.setNavigationBarTitle();
      this.data.shouldChangeTitle = false;
    }
  },

  // zan ui 的 bug，这样做是为了让最后一栏 field 的键盘上的√能起到保存数据的作用
  handleFieldChange(e) {
    this.saveInfo();
  },

  syncValue(e) {
    this.data[e.currentTarget.id] = e.detail.detail.value;
  },

  saveInfo() {
    console.log(this.data);

    globalData.stuId = this.data.stuId;
    globalData.stuName = this.data.stuName;

    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];

    prevPage.setData({
      stuId: this.data.stuId,
      stuName: this.data.stuName
    });

    wx.navigateBack({
      delta: 1
    });
  },


  setLanguage() {
    this.setData({
      language: wx.T.getLanguage()
    });
    this.data.shouldChangeTitle = true;
  }
});