'use strict';
(() => {
  const form = document.querySelector(`.ad-form`);
  const inputAdTitle = form.querySelector(`#title`);
  const formAdPrice = form.querySelector(`#price`);
  const descriptionField = form.querySelector(`#description`);
  const formResetBtn = form.querySelector(`.ad-form__reset`);
  const adFormType = form.querySelector(`#type`);
  // const buildingType = form.querySelector(`.ad-form__element`).querySelectorAll(`option`);
  const timein = form.querySelector(`#timein`);
  const timeout = form.querySelector(`#timeout`);
  const guestsAmount = form.querySelector(`#capacity`).querySelectorAll(`option`);
  const roomsNumberList = form.querySelector(`#room_number`);
  const roomCapacity = form.querySelector(`#capacity`);
  const fieldSets = document.querySelectorAll(`fieldset`);
  const main = document.body.querySelector(`main`);


  const MIN_LENGTH = 30;
  const MAX_LENGTH = 100;
  const MAX_PRICE = 1000000;

  let minCost = {
    bungalow: 0,
    house: 5000,
    flat: 1000,
    palace: 10000,
  };

  const matchValue = (first, second) => {
    second.value = first.value;
  };

  inputAdTitle.addEventListener(`change`, function () {
    let inputText = inputAdTitle.value.replace(/\s+/g, ``).trim();
    inputAdTitle.value = inputText;
    if (inputText.length < MIN_LENGTH) {
      inputAdTitle.setCustomValidity(`Минимальное количество символов: ` + inputAdTitle.minLength);
    } else if (inputAdTitle >= MAX_LENGTH) {
      inputAdTitle.setCustomValidity(`Максимальное количество символов: ` + inputAdTitle.maxLength);
    } else {
      inputAdTitle.setCustomValidity(``);
    }
    inputAdTitle.reportValidity();
  });

  formAdPrice.addEventListener(`input`, function () {
    let inputText = +formAdPrice.value;
    if (inputText === 0) {
      formAdPrice.setCustomValidity(`Введите число!`);
    } else if (inputText > MAX_PRICE) {
      formAdPrice.setCustomValidity(`Максимальная цена за ночь 1 000 000 !`);
    } else if (adFormType.value === `house` && inputText < minCost.house) {
      formAdPrice.setCustomValidity(`Минимальная стоимость дома не должна быть меньше ` + minCost.house + ` руб`);
    } else if (adFormType.value === `flat` && inputText < minCost.flat) {
      formAdPrice.setCustomValidity(`Минимальная стоимость квартиры не должна быть меньше ` + minCost.flat + ` руб`);
    } else if (adFormType.value === `palace` && inputText < minCost.palace) {
      formAdPrice.setCustomValidity(`Минимальная стоимость дворца не должна быть меньше ` + minCost.palace + ` руб`);
    } else {
      formAdPrice.setCustomValidity(``);
    }
    formAdPrice.reportValidity();
  });

  timein.addEventListener(`change `, function () {
    matchValue(timein, timeout);
  });

  timeout.addEventListener(`change `, function () {
    matchValue(timeout, timein);
  });

  const updateRoomsNumberList = () => {
    guestsAmount.forEach((option) => {
      option.setAttribute(`disabled`, true);
      option.removeAttribute(`selected`);
    });

    const showedRooms = new Set();
    switch (roomsNumberList.value) {
      case `3`:
        showedRooms.add(`3`);
        // fall through
      case `2`:
        showedRooms.add(`2`);
        // fall through
      case `1`:
        showedRooms.add(`1`);
        break;
      case `100`:
        showedRooms.add(`0`);
    }

    guestsAmount.forEach((option) => {
      if (showedRooms.has(option.value)) {
        option.removeAttribute(`disabled`);
      }
    });

    roomCapacity.querySelector(`option:not(:disabled)`).setAttribute(`selected`, true);
  };


  const diactivatePage = () => {
    map.classList.add(`map--faded`);
    form.classList.add(`ad-form--disabled`);
    inputAdTitle.value = ``;
    descriptionField.value = ``;
    formAdPrice.value = ``;
    fieldSets.forEach((field) => {
      field.disabled = true;
    });
  };

  const map = document.querySelector(`.map`);
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);

  const onSuccessFormSend = () => {
    const successMessage = successTemplate.cloneNode(true);
    main.appendChild(successMessage);
    successMessage.addEventListener(`click`, function () {
      main.removeChild(successMessage);
    });
    diactivatePage();
    formResetBtn.removeEventListener(`click`, diactivatePage);
  };

  formResetBtn.addEventListener(`click`, diactivatePage);

  form.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    // eslint-disable-next-line no-undef
    xhrModule.upload(new FormData(form), onSuccessFormSend, xhrModule.onError);
  });

  updateRoomsNumberList();
  roomsNumberList.addEventListener(`change`, updateRoomsNumberList);
})();
