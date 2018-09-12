import event from '../../utils/event';
const util = require('../../utils/util');
const request = require('../../utils/requests');
const userAdapter = require('../../utils/user-adapter');
const isValid = require('../../utils/format-checker');

let globalData = getApp().globalData;

Page({
  data: {
    profiles: [
      'stuName',
      'identify',
      'stuLanguage',
      'phone_number',
      'session',
      'email',
      'school'
    ]
  },

  onLoad: function () {
    this.setData({
      user: globalData.user
    });
    this.setLanguage();
    event.on('languageChanged', this, this.setLanguage);
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

  updateUser(event) {
    this.setData({
      showChangeProfilePopup: true,
      selectedProfile: event.currentTarget.id
    });

    // user[event.currentTarget.id] = 
  },
  toggleChangeProfilePopup() {
    this.setData({
      showChangeProfilePopup: !this.data.showChangeProfilePopup
    });
  },

  abandonInfo() {
    this.setData({
      showChangeProfilePopup: false
    });
  },
  submitInfo(event) {
    if(isValid(this.data.selectedProfile, event.detail.value[this.data.selectedProfile])) {
      let updatedUser = this.data.user;
      updatedUser[this.data.selectedProfile] = event.detail.value[this.data.selectedProfile];
      request.updateUser(this.data.user.id, userAdapter.getServerUser(updatedUser))
        .then(res => {
          if(res.statusCode === 200) {
            util.show(this.data.language.changeProfileSucceed, 'success');
            globalData.user = userAdapter.getClientUser(res.data);
            this.setData({
              user: globalData.user
            });
          }
        });
    }
    
    this.toggleChangeProfilePopup();
  }
});