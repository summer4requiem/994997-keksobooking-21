"use strict";
(function () {
  const adForm = document.querySelector(`.ad-form`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const fieldSets = document.querySelectorAll(`fieldset`);
  const addressInput = document.querySelector(`#address`);
  const LEFT_MOUSE_CLICK_KEY_CODE = 1;
  const ENTER_CODE = `Enter`;
  const map = document.querySelector(`.map`);
  adForm.classList.add(`ad-form--disabled`);


  const removeDisablePageAttributes = () => {
    fieldSets.forEach((field) => {
      field.disabled = false;
      map.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
    });
    addressInput.value = (570 + 22) + ` x ` + (375 + 10) + ` y`;
    render.pins();
    mainPin.removeEventListener(`click`, removeDisablePageAttributes);
    mainPin.removeEventListener(`mousedown`, onMouseDownActivatePage);
    mainPin.removeEventListener(`keydown`, onKeyDownActivatePage);
  };

  const onMouseDownActivatePage = (eventObj) => {
    if (eventObj.buttons === LEFT_MOUSE_CLICK_KEY_CODE) {
      removeDisablePageAttributes(eventObj);
    }
  };

  const onKeyDownActivatePage = (eventObj) => {
    if (eventObj.code === ENTER_CODE) {
      removeDisablePageAttributes(eventObj);
    }
  };

  mainPin.addEventListener(`mousedown`, onMouseDownActivatePage);
  mainPin.addEventListener(`keydown`, onKeyDownActivatePage);
})();
