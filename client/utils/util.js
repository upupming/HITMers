import Toast from '../van-ui/toast/toast';

function show(message, type) {
  if(type) {
    Toast[type](message);
  } else {
    Toast(message);
  }
}

function keepShowing(message, type) {
  if(type) {
    Toast[type]({
      duration: 0,
      message
    });
  } else {
    Toast({
      duration: 0,
      message
    });
  }
}

function getDateString(date, withHours) {
  return getYearMonthDays(date)
    + (withHours ? getHourMinutes(date) : '');
}
function getYearMonthDays(date) {
  date = new Date(date);
  return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
}
function getHourMinutes(date) {
  date = new Date(date);
  return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
}

module.exports = { show, keepShowing, getDateString, getYearMonthDays, getHourMinutes };