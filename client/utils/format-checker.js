const util = require('./util');

const globalData = getApp().globalData;

module.exports = (profile, value) => {
  switch(profile) {
  case 'stuName':
    if(value == null || !/^[\u4e00-\u9fa5]+$/gm.test(value)) {
      util.show(globalData.language.stuName.illegal, 'fail');
      return false;
    }
    break;
  case 'identify':
    if(value == null || !globalData.language.identify.placeholder.includes(value)) {
      util.show(globalData.language.identify.illegal, 'fail');
      return false;
    }
    break;
  case  'stuLanguage':
    if(value == null || !globalData.language.stuLanguage.placeholder.includes(value)) {
      util.show(globalData.language.stuLanguage.illegal, 'fail');
      return false;
    }
    break;
  case 'phone_number':
    if(!wx.pro.match('phoneNumber', value)) {
      util.show(globalData.language.phone_number.illegal, 'fail');
      return false;
    }
    break;
  case 'session':
    if(!/^\d\d$/g.test(value)) {
      util.show(globalData.language.session.illegal, 'fail');
      return false;
    }
    break;
  case 'email':
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
      util.show(globalData.language.email.illegal, 'fail');
      return false;
    }
    break;
  case 'school':
    if(!value.includes('学院')) {
      util.show(globalData.language.school.illegal, 'fail');
      return false;
    }
    break;
  case 'streamable':
    if(!/^.{5}$/gm.test(value)) {
      util.show(globalData.language.streamable.illegal, 'fail');
      return false;
    }
    break;
  }
  return true;
};