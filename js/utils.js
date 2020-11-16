"use strict";

const PIN_START_TOP_POSITION = 375;
const PIN_START_LEFT_POSITION = 570;

const mainPin = document.querySelector(`.map__pin--main`);
const address = document.querySelector(`#address`);

window.PriceLimit = {
  low: {
    min: 0,
    max: 10000
  },
  middle: {
    min: 10000,
    max: 50000
  },
  hight: {
    min: 50000,
    max: Infinity
  }
};

window.setDefaultPinPosition = () => {
  mainPin.style.left = `${PIN_START_LEFT_POSITION}px`;
  mainPin.style.top = `${PIN_START_TOP_POSITION}px`;
  address.value = `${window.pinAddres.x}, ${window.pinAddres.defaultY}`;
};

window.pinSize = {
  width: mainPin.offsetWidth,
  height: mainPin.offsetHeight,
  sharpEnd: 22,
};

window.pinSizeMiddle = {
  left: Math.floor(window.pinSize.width / 2),
  top: Math.floor(window.pinSize.height / 2),
};

window.pinAddres = {
  x: parseInt(mainPin.style.left, 10) + window.pinSizeMiddle.left,
  y: parseInt(mainPin.style.top, 10) + window.pinSizeMiddle.top + window.pinSize.sharpEnd,
  defaultY: parseInt(mainPin.style.top, 10) + window.pinSizeMiddle.left,
};

window.updatePins = () => {
  const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach((p) => {
    p.remove();
  });
};

window.code = {
  ENTER: `Enter`,
  ESC: `Escape`,
  SUCCESS: 200,
  LEFT_MOUSE: 1,
};
