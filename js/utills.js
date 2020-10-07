"use strict";

const getRandomRange = (min, max) => Math.floor(Math.random() * (max - min) + min);
const getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomLengthArr = (arr) => {
  const randomArray = [];
  for (let i = 0; i < getRandomRange(1, arr.length); i++) {
    randomArray.push(arr[i]);
  }
  return randomArray;
};

window.getRandom = {
  lengthArr: getRandomLengthArr,
  range: getRandomRange,
  arrayItem: getRandomArrayItem,
};
