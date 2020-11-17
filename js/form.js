'use strict';

const MIN_LENGTH = 30;
const MAX_LENGTH = 100;
const MAX_PRICE = 1000000;
const DEFAULT_IMG = `http://127.0.0.1:5500/img/muffin-grey.svg`;

const form = document.querySelector(`.ad-form`);
const formFilters = document.querySelector(`.map__filters`);
const formSelects = formFilters.querySelectorAll(`select`);
const formAvatar = document.querySelector(`.ad-form-header__preview img`);
const houseImg = document.querySelector(`.ad-form__photo`);
const inputAdTitle = form.querySelector(`#title`);
const formAdPrice = form.querySelector(`#price`);
const descriptionField = form.querySelector(`#description`);
const formResetBtn = form.querySelector(`.ad-form__reset`);
const adFormType = form.querySelector(`#type`);
const timein = form.querySelector(`#timein`);
const timeout = form.querySelector(`#timeout`);
const guestsAmount = form.querySelector(`#capacity`).querySelectorAll(`option`);
const roomsNumberList = form.querySelector(`#room_number`);
const roomCapacity = form.querySelector(`#capacity`);
const fieldSets = document.querySelectorAll(`fieldset`);
const main = document.body.querySelector(`main`);
const houseType = document.body.querySelector(`#housing-type`);
const map = document.querySelector(`.map`);
const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const successMessage = successTemplate.cloneNode(true);

const minCost = {
  bungalow: 0,
  house: 5000,
  flat: 1000,
  palace: 10000,
};

const matchValue = (first, second) => {
  second.value = first.value;
};

inputAdTitle.addEventListener(`input`, () => {
  const inputText = inputAdTitle.value.trim();
  inputAdTitle.value = inputText;
  const restLetters = inputAdTitle.minLength - inputText.length;
  if (inputText.length < MIN_LENGTH) {
    inputAdTitle.setCustomValidity(`Минимальное количество символов: ${inputAdTitle.minLength} осталось: ${restLetters}`);
  } else if (inputText.length === MAX_LENGTH) {
    inputAdTitle.setCustomValidity(`Максимальное количество символов: ${inputAdTitle.maxLength}`);
  } else {
    inputAdTitle.setCustomValidity(``);
  }
  inputAdTitle.reportValidity();
});

const onUpdatePricePlaceHolder = () => {
  switch (adFormType.value) {
    case `house`:
      formAdPrice.placeholder = minCost.house;
      break;
    case `flat`:
      formAdPrice.placeholder = minCost.flat;
      break;
    case `bungalow`:
      formAdPrice.placeholder = minCost.bungalow;
      break;
    case `palace`:
      formAdPrice.placeholder = minCost.palace;
      break;
  }
};

const onFieldInvalid = (field) => {
  field.setCustomValidity(`Пожалуйста, заполните поле!`);
};

formAdPrice.addEventListener(`invalid`, onFieldInvalid(formAdPrice));
inputAdTitle.addEventListener(`invalid`, onFieldInvalid(inputAdTitle));

formAdPrice.addEventListener(`input`, () => {
  const inputText = +formAdPrice.value;
  let message;
  if (inputText === 0) {
    message = `Введите число!`;
  } else if (inputText > MAX_PRICE) {
    message = `Максимальная цена за ночь 1 000 000 !`;
  } else if (adFormType.value === `house` && inputText < minCost.house) {
    message = `Минимальная стоимость дома не должна быть меньше ${minCost.house} руб`;
  } else if (adFormType.value === `flat` && inputText < minCost.flat) {
    message = `Минимальная стоимость квартиры не должна быть меньше ${minCost.flat} руб`;
  } else if (adFormType.value === `palace` && inputText < minCost.palace) {
    message = `Минимальная стоимость дворца не должна быть меньше ${minCost.palace} руб`;
  } else if (adFormType.value === `bungalow` && inputText < minCost.bungalow) {
    message = `Минимальная стоимость бунгало не может быть меньше ${minCost.bungalow} руб`;
  } else {
    message = ``;
  }
  formAdPrice.setCustomValidity(message);
  formAdPrice.reportValidity();
});

timein.addEventListener(`change`, () => {
  matchValue(timein, timeout);
});

timeout.addEventListener(`change`, () => {
  matchValue(timeout, timein);
});

const onUpdateRoomsNumberList = () => {
  guestsAmount.forEach((option) => {
    option.setAttribute(`disabled`, `true`);
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

  roomCapacity.querySelector(`option:not(:disabled)`).setAttribute(`selected`, `true`);
};

const resetFormPhotos = () => {
  houseImg.innerHtml = ``;
  formAvatar.src = DEFAULT_IMG;
  while (houseImg.firstChild) {
    houseImg.removeChild(houseImg.lastChild);
  }
};

const onDeactivatedPage = () => {
  map.classList.add(`map--faded`);
  form.classList.add(`ad-form--disabled`);
  formFilters.classList.add(`ad-form--disabled`);
  inputAdTitle.value = ``;
  descriptionField.value = ``;
  formAdPrice.value = ``;
  houseType.value = `any`;
  window.updatePins();
  resetFormPhotos();
  window.formFieldDisabled(fieldSets, true);
  window.formFieldDisabled(formSelects, true);
  window.pageUtilsModule.addMainPinListeners();
  window.setDefaultPinPosition();
};

const onEscSuccessFormClose = (evt) => {
  if (evt.code === `Escape`) {
    onClickSuccessFormClose();
    document.removeEventListener(`keydown`, onEscSuccessFormClose);
  }
};

const onClickSuccessFormClose = () => {
  successMessage.remove();
  successMessage.removeEventListener(`click`, onClickSuccessFormClose);
};

const onSuccessFormSend = () => {
  main.appendChild(successMessage);
  // for Firefox automaticly focusing on successMessage and close
  successMessage.focus();
  successMessage.addEventListener(`click`, onClickSuccessFormClose);
  document.addEventListener(`keydown`, onEscSuccessFormClose);
  onDeactivatedPage();
};

form.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  window.xhrModule.upload(new FormData(form), onSuccessFormSend);
});

onUpdateRoomsNumberList();
onUpdatePricePlaceHolder();

formResetBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  onDeactivatedPage();
});
adFormType.addEventListener(`change`, onUpdatePricePlaceHolder);
roomsNumberList.addEventListener(`change`, onUpdateRoomsNumberList);
