// Adapted from https://developer.mozilla.org/en-US/docs/Web/Events/resize

const callbacks = [];

let running = false;

// run the actual callbacks
function runCallbacks() {
  callbacks.forEach(callback => {
    callback();
  });

  running = false;
}

// fired on resize event
function resize() {
  if (!running) {
    running = true;

    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(runCallbacks);
    } else {
      setTimeout(runCallbacks, 66);
    }
  }
}

// adds callback to loop
function addCallback(callback) {
  if (callback) {
    callbacks.push(callback);
  }
}

// public method to add additional callback
export default callback => {
  if (!callbacks.length) {
    window.addEventListener('resize', resize);
  }
  addCallback(callback);
};
