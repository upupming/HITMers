import Toast from '../van-ui/toast/index';

function show(message, type) {
  Toast[type](message);
}

module.exports = { show };