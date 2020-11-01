"use strict";
(() => {
  const allFilters = document.body.querySelectorAll(`.map__filter`);
  const houseFatures = document.querySelectorAll(`.map__checkbox`);
  const mapFilters = document.querySelector(`.map__filters`);

  const getPinsArray = (data) => {
    window.pinsArray = data;
  };

  const priceLimit = {
    low: 10000,
    high: 50000,
  };

  const filterParams = (filterArray) => {
    // saved all the filters from form
    let type = filterArray[0];
    let price = filterArray[1];
    let rooms = filterArray[2];
    let guests = filterArray[3];
    let features = filterArray[4];
    let newPins = window.pinsArray.concat();

    window.updatePins();
    window.cardModule.isCardExist();

    if (type !== `any`) {
      newPins = window.pinsArray.filter((pin) => pin.offer.type === type);
    }
    if (price !== `any`) {
      switch (price) {
        case `low`:
          newPins = newPins.filter((pin) => pin.offer.price <= priceLimit.low);
          break;
        case `high`:
          newPins = newPins.filter((pin) => pin.offer.price >= priceLimit.high);
          break;
        default:
          newPins = newPins.filter((pin) => pin.offer.price > priceLimit.low && pin.offer.price < priceLimit.high);
      }
    }
    if (rooms !== `any`) {
      newPins = newPins.filter((pin) => pin.offer.rooms.toString() === rooms);
    }
    if (guests !== `any`) {
      newPins = newPins.filter((pin) => pin.offer.guests.toString() === guests);
    }
    if (features.length) {
      for (let i = 0; i < features.length; i++) {
        newPins = newPins.filter((pin) => pin.offer.features.indexOf(features[i]) === -1 ? null : pin.offer.guests);
      }
    }
    window.pinModule.renderPins(newPins);
  };

  mapFilters.addEventListener(`change`, function () {
    let filter = [];
    let filterFeatures = [];
    allFilters.forEach((el) => {
      filter.push(el.value);
    });

    houseFatures.forEach((f) => {
      if (f.checked) {
        filterFeatures.push(f.value);
      }
    });
    filter.push(filterFeatures);
    filterParams(filter);
  });
  window.xhrModule.load(getPinsArray);
})();
