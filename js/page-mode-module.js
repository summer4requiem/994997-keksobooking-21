"use strict";

const form = document.querySelector(`.ad-form`);
const address = form.querySelector(`#address`);
const mainPin = document.querySelector(`.map__pin--main`);
const formFilters = document.querySelector(`.map__filters`);
const fieldSets = document.querySelectorAll(`fieldset`);
const formSelects = formFilters.querySelectorAll(`select`);
const map = document.querySelector(`.map`);

form.classList.add(`ad-form--disabled`);
formFilters.classList.add(`ad-form--disabled`);
window.setDefaultPinPosition();

window.formFieldDisabled(fieldSets, true);
window.formFieldDisabled(formSelects, true);

const activatePage = () => {
  window.formFieldDisabled(fieldSets, false);
  window.formFieldDisabled(formSelects, false);
  map.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);
  formFilters.classList.remove(`ad-form--disabled`);

  window.pinModule.renderPins(window.pinsArray);
  address.value = `${window.pinAddres.x}, ${window.pinAddres.y}`;
};

const removePinListeners = () => {
  mainPin.removeEventListener(`mousedown`, onMouseDownActivatePage);
  mainPin.removeEventListener(`keydown`, onKeyDownActivatePage);
};

const onMouseDownActivatePage = (evt) => {
  if (evt.buttons === window.code.LEFT_MOUSE) {
    activatePage();
    removePinListeners();
  }
};

const onKeyDownActivatePage = (evt) => {
  if (evt.code === window.code.ENTER) {
    activatePage();
    removePinListeners();
  }
};

const addMainPinListeners = () => {
  mainPin.addEventListener(`mousedown`, onMouseDownActivatePage);
  mainPin.addEventListener(`keydown`, onKeyDownActivatePage);
};

addMainPinListeners();

window.pageUtilsModule = {
  addMainPinListeners,
};
