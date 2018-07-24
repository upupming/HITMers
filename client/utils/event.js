let events = {};

function on(name, self, callback) {
  let tuple = [self, callback];
  let callbacks = events[name];
  if (Array.isArray(callbacks)) {
    callbacks.push(tuple);
  }
  else {
    events[name] = [tuple];
  }
}

function remove(name, self) {
  let callbacks = events[name];
  if (Array.isArray(callbacks)) {
    events[name] = callbacks.filter((tuple) => {
      return tuple[0] != self;
    })
  }
}

function emit(name, data) {
  let callbacks = events[name];
  if (Array.isArray(callbacks)) {
    callbacks.map((tuple) => {
      let self = tuple[0];
      let callback = tuple[1];
      callback.call(self, data);
    })
  }
}

exports.on = on;
exports.remove = remove;
exports.emit = emit;