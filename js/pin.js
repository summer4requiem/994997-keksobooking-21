"use strict";

const MAX_PINS_AMOUNT = 5;
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPinsContainer = document.querySelector(`.map__pins`);

const createPin = (pin) => {
  const pinImg = pinTemplate.cloneNode(true);
  pinImg.style.cssText = `left: ${pin.location.x}px; top: ${pin.location.y}px`;
  pinImg.querySelector(`img`).src = pin.author.avatar;
  pinImg.style.alt = pin.description;

  pinImg.addEventListener(`click`, () => {
    let activeBtn = mapPinsContainer.querySelector(`.map__pin--active`);
    if (activeBtn) {
      activeBtn.classList.remove(`map__pin--active`);
    }
    pinImg.classList.add(`map__pin--active`);
    mapPinsContainer.appendChild(window.cardModule.createCard(pin));
  });
  return pinImg;
};

const renderPins = (pins) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; pins.length > MAX_PINS_AMOUNT ? i < MAX_PINS_AMOUNT : i < pins.length; i++) {
    fragment.appendChild(createPin(pins[i]));
    mapPinsContainer.appendChild(fragment);
  }
};

window.pinModule = {
  renderPins,
};

