const Toast = require('../zan-ui/toast/toast');

function show(message, type) {
  Toast({
    message: message,
    type: type,
    selector: '#toast',
    timeout: 1500
  });
}

module.exports = { show };