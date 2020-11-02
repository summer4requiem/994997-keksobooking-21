'use strict';
(() => {})();
const mainPin = document.querySelector(`.map__pin--main`);
const addressInput = document.querySelector(`#address`);

const maxCoord = {
  xLeftMin: Math.floor(0 - window.pinSizeMiddle.left),
  xRightMin: Math.floor(1135 + window.pinSizeMiddle.top),
  yTopMax: 130 - (window.pinSizeMiddle.left + window.pinSize.sharpEnd),
  yBottomMax: 630 - (window.pinSizeMiddle.left + window.pinSize.sharpEnd),
};


const checkCoordsLimit = (coords, min, max) => {
  if (coords > max) {
    return max;
  } else if (coords < min) {
    return min;
  } else {
    return coords;
  }
};

mainPin.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();
  let startCoords = {
    x: evt.clientX,
    y: evt.clientY,
  };

  const onMouseMove = (evtMove) => {
    const shiftCoord = {
      x: startCoords.x - evtMove.clientX,
      y: startCoords.y - evtMove.clientY,
    };

    startCoords = {
      x: evtMove.clientX,
      y: evtMove.clientY,
    };

    let left = mainPin.offsetLeft - shiftCoord.x;
    let top = mainPin.offsetTop - shiftCoord.y;

    mainPin.style.left = checkCoordsLimit(left, maxCoord.xLeftMin, maxCoord.xRightMin) + `px`;
    mainPin.style.top = checkCoordsLimit(top, maxCoord.yTopMax, maxCoord.yBottomMax) + `px`;
    addressInput.value = (left + window.pinSizeMiddle.left) + `, ` + (top + window.pinSizeMiddle.top + window.pinSize.sharpEnd);
  };

  const onMouseUp = () => {
    document.removeEventListener(`mousemove`, onMouseUp);
    document.removeEventListener(`mousemove`, onMouseMove);
  };

  document.addEventListener(`mouseup`, onMouseUp);
  document.addEventListener(`mousemove`, onMouseMove);
});
