import Toast from '../van-ui/toast/toast';

function show(message, type) {
  if(type) {
    Toast[type](message);
  } else {
    Toast(message);
  }
}

module.exports = { show };