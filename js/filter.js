"use strict";
(() => {
  const housType = document.body.querySelector(`#housing-type`);

  const getPinsArray = (data) => {
    window.pinsArray = data;
  };

  window.updatePins = () => {
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((p) => {
      p.remove();
    });
  };

  // eslint-disable-next-line no-undef
  xhrModule.load(getPinsArray);

  const filterByType = (filerName) => {
    // eslint-disable-next-line no-undef
    updatePins();
    const selectedFilter = [];
    let item = [];

    switch (filerName) {

      case `bungalow`:
        // eslint-disable-next-line no-undef
        item = pinsArray.filter((p) => p.offer.type === `bungalow`);
        selectedFilter.push(item);
        break;
      case `palace`:
        // eslint-disable-next-line no-undef
        item = pinsArray.filter((p) => p.offer.type === `palace`);
        selectedFilter.push(item);
        break;
      case `flat`:
        // eslint-disable-next-line no-undef
        item = pinsArray.filter((p) => p.offer.type === `flat`);
        selectedFilter.push(item);
        break;
      case `house`:
        // eslint-disable-next-line no-undef
        item = pinsArray.filter((p) => p.offer.type === `house`);
        selectedFilter.push(item);
        break;
      case `any`:
        // eslint-disable-next-line no-undef
        selectedFilter.push(pinsArray);
    }
    // eslint-disable-next-line no-undef
    pinModule.renderPins(selectedFilter[0]);
  };

  housType.addEventListener(`change`, function () {
    filterByType(housType.value);
  });
})();
