"use strict";

window.getRandomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};


window.getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

