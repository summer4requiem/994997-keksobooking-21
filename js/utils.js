"use strict";
(() => {
  const mainPin = document.querySelector(`.map__pin--main`);


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
})();

