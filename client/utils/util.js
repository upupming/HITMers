import Toast from '../van-ui/toast/index';

function show(message, type) {
  if(type) {
    Toast[type](message);
  } else {
    Toast(message);
  }
}

module.exports = { show };