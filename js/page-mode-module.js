"use strict";

const form = document.querySelector(`.ad-form`);
const mainPin = document.querySelector(`.map__pin--main`);
const fieldSets = document.querySelectorAll(`fieldset`);
const address = form.querySelector(`#address`);

const map = document.querySelector(`.map`);
form.classList.add(`ad-form--disabled`);

fieldSets.forEach((field) => {
  field.disabled = true;
});

address.value = window.pinAddres.x + `, ` + window.pinAddres.defaultY;

const activatePage = () => {
  fieldSets.forEach((field) => {
    field.disabled = false;
    map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);
  });
  window.pinModule.renderPins(window.pinsArray);
  address.value = window.pinAddres.x + `, ` + window.pinAddres.y;
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
