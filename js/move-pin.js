'use strict';

(() => {
  const mainPin = document.querySelector(`.map__pin--main`);
  const addressInput = document.querySelector(`#address`);

  const allowPinPosition = {
    xLeft: 0,
    xRight: 1130,
    yTop: 130,
    yBottom: 630,
  };

  mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (evtMove) => {
      const shiftCoord = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };
      startCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      let left = mainPin.offsetLeft - shiftCoord.x;
      let top = mainPin.offsetTop - shiftCoord.y;

      mainPin.style.left = checkCoordsLimit(left, allowPinPosition.xLeft, allowPinPosition.xRight) + `px`;
      mainPin.style.top = checkCoordsLimit(top, allowPinPosition.yTop, allowPinPosition.yBottom) + `px`;
      addressInput.value = `${left}` + `,` + ` ${top}`;
    };

    const onMouseUp = () => {
      document.removeEventListener(`mousemove`, onMouseUp);
      document.removeEventListener(`mousemove`, onMouseMove);
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
    document.addEventListener(`mouseup`, onMouseUp);
    document.addEventListener(`mousemove`, onMouseMove);
  });
})();
