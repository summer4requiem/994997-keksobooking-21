"use strict";
(() => {
  const TOTAL_OBJECTS = 8;
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPinsContainer = document.querySelector(`.map__pins`);

  const createPin = (pin) => {
    const pinImg = pinTemplate.cloneNode(true);
    pinImg.style.cssText = `left: ${pin.location.x}px; top: ${pin.location.y}px`;
    pinImg.querySelector(`img`).src = pin.author.avatar;
    pinImg.style.alt = pin.description;

    pinImg.addEventListener(`click`, function () {
      // eslint-disable-next-line no-undef
      mapPinsContainer.appendChild(cardModule.createCard(pin));
    });
    return pinImg;
  };

  const renderPins = (pins) => {
    // eslint-disable-next-line no-undef
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < TOTAL_OBJECTS; i++) {
      fragment.appendChild(createPin(pins[i]));
      mapPinsContainer.appendChild(fragment);
    }
  };

  window.pinModule = {
    renderPins,
  };

})();
