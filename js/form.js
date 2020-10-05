'use strict';
(function () {
  const form = document.querySelector(`.ad-form`);
  const formFilters = form.querySelector(`.map__filters`);
  const inputAdTitle = form.querySelector(`#title`);
  const formAdPrice = form.querySelector(`#price`);
  const housingType = form.querySelector(`#housing-type`);
  const housingPrice = form.querySelector(`#housing-price`);
  const adFormType = form.querySelector(`#type`);
  const adFormElement = form.querySelector(`.ad-form__element`);
  const timein = form.querySelector(`#timein`);
  const timeout = form.querySelector(`#timeout`);
  const roomsAmount = form.querySelector(`#room_number`).querySelectorAll(`option`);
  const roomsNumber = form.querySelector(`#room_number`).querySelectorAll(`option`);
  const roomsNumberList = form.querySelector(`#room_number`);
  const roomCapacity = form.querySelector(`#capacity`);

  const MAX_PRICE = 1000000;

  let minPrice = {
    bungalow: 0,
    house: 5000,
    flat: 1000,
    palace: 10000,
  };

  const matchValue = (first, second) => {
    second.value = first.value;
  };


  inputAdTitle.addEventListener(`invalid`, function () {
    if (inputAdTitle.validity.tooShort) {
      inputAdTitle.setCustomValidity(`Минимальное количество символов: ` + inputAdTitle.minLength);
    } else if (inputAdTitle.validity.tooLong) {
      inputAdTitle.setCustomValidity(`Максимальное количество символов:` + inputAdTitle.minLength);
    } else if (inputAdTitle.validity.valueMissing) {
      inputAdTitle.setCustomValidity(`Минимальное количество символов: ` + inputAdTitle.minLength);
    } else {
      inputAdTitle.setCustomValidity(``);
    }
  });


  formAdPrice.addEventListener(`input`, function () {
    let inputText = formAdPrice.value.trim();
    if (inputText > MAX_PRICE) {
      formAdPrice.setCustomValidity(`Максимальная цена за ночь 1 000 000 !`);
    } else if (adFormType.value === `house` && inputText < minPrice.house) {
      formAdPrice.setCustomValidity(`Минимальная стоимость дома не должна быть меньше ` + minPrice.house + ` руб`);
    } else if (adFormType.value === `flat` && inputText < minPrice.flat) {
      formAdPrice.setCustomValidity(`Минимальная стоимость квартиры не должна быть меньше ` + minPrice.flat + ` руб`);
    } else if (adFormType.value === `palace` && inputText < minPrice.palace) {
      formAdPrice.setCustomValidity(`Минимальная стоимость дворца не должна быть меньше ` + minPrice.palace + ` руб`);
    } else {
      formAdPrice.setCustomValidity(`Все ок`);
    }
  });

  timein.addEventListener(`change`, function () {
    matchValue(timein, timeout);
  });

  timeout.addEventListener(`change`, function () {
    matchValue(timeout, timein);
  });

  form.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
  });


  roomCapacity.addEventListener(`change`, function () {
    const allowedRooms = Array.from(roomsAmount);
    let showes = [];
    let showedRooms = [];

    switch (roomCapacity.value) {
      case `1`:
        showedRooms = allowedRooms.filter((r) => r.value >= 1);
        break;

      case `2`:
        showedRooms = allowedRooms.filter((r) => r.value >= 2);
        break;

      case `3`:
        showedRooms = allowedRooms.filter((r) => r.value >= 3);
        break;

      case `0`:
        showedRooms = allowedRooms.filter((r) => r.value === 0);
        break;
    }

    showes.push(showedRooms);
    for (let index = 0; index < showes.length; index++) {
      if (allowedRooms[index] !== showes[index]) {
        roomsNumberList.removeChild(roomsNumberList[index]);
      } else {
        return;
      }
    }
  });

})();
