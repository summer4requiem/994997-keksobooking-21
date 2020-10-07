"use strict";

(function () {
  const TOTAL_OBJECTS = 8;
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPinsContainer = document.querySelector(`.map__pins`);

  const createPin = (pin) => {
    const pinImg = pinTemplate.cloneNode(true);
    pinImg.style.left = pin.location.x + `px`;
    pinImg.style.top = pin.location.y + `px`;
    pinImg.querySelector(`img`).src = pin.author.avatar;
    pinImg.style.alt = pin.description;

    pinImg.addEventListener(`click`, function () {
      const mapCard = mapPinsContainer.querySelector(`.map__card`);
      if (mapPinsContainer.contains(mapCard)) {
        return;
      }else {
        mapPinsContainer.appendChild(create.card(pin));
        const closePopup = mapPinsContainer.querySelector(`.popup__close`);
        closePopup.addEventListener(`click`, onPopupClose);
      }
    });
    return pinImg;
  };


  const onPopupClose = () => {
    mapPinsContainer.removeChild(mapPinsContainer.querySelector(`.popup`));
  };

  const renderPins = () => {
    const fragment = document.createDocumentFragment();
    const pins = createAdvertisement.array();
    for (let index = 0; index < TOTAL_OBJECTS; index++) {
      fragment.appendChild(createPin(pins[index]));
      mapPinsContainer.appendChild(fragment);
    }
  };

  window.render = {
    pins: renderPins,
  };
})();
