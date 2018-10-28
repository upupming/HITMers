import Toast from '../van-ui/toast/toast';

function show(message, type) {
  if(type) {
    Toast[type](message);
  } else {
    Toast(message);
  }
}

function getDateString(date, withHours) {
  return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
    + (withHours ? `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}` : '');
}

module.exports = { show, getDateString };