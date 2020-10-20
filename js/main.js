"use strict";
(() => {
  const form = document.querySelector(`.ad-form`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const fieldSets = document.querySelectorAll(`fieldset`);
  const address = form.querySelector(`#address`);
  const LEFT_MOUSE_CLICK_KEY_CODE = 1;
  const ENTER_CODE = `Enter`;
  const map = document.querySelector(`.map`);
  form.classList.add(`ad-form--disabled`);

  fieldSets.forEach((field) => {
    field.disabled = true;
  });

  const activatePage = () => {
    fieldSets.forEach((field) => {
      field.disabled = false;
      map.classList.remove(`map--faded`);
      form.classList.remove(`ad-form--disabled`);
    });
    // eslint-disable-next-line no-undef
    xhrModule.load(pinModule.renderPins);
    address.value = `${mainPin.clientX}` + `,` + ` ${mainPin.style.top}`;
    // mainPin.removeEventListener(`mousedown`, onMouseDownActivatePage);
    // mainPin.removeEventListener(`keydown`, onKeyDownActivatePage);
  };

  const onMouseDownActivatePage = (eventObj) => {
    if (eventObj.buttons === LEFT_MOUSE_CLICK_KEY_CODE) {
      // activatePage(eventObj);
      activatePage();
    }
  };

  const onKeyDownActivatePage = (eventObj) => {
    if (eventObj.code === ENTER_CODE) {
      activatePage();
    }
  };

  mainPin.addEventListener(`mousedown`, onMouseDownActivatePage);
  mainPin.addEventListener(`click`, onKeyDownActivatePage);
})();
