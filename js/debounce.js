"use strict";

const INTERVAL = 300; // ms

let lastTimeOut = null;

window.debounce = (cb) => {
  return (...parameters) => {
    if (lastTimeOut) {
      window.clearTimeout(lastTimeOut);
    }
    lastTimeOut = window.setTimeout(() => {
      cb(...parameters);
    }, INTERVAL);
  };
};
