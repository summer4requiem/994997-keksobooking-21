"use strict";
(() => {
  // const POST_URL = `https://21.javascript.pages.academy/keksobooking`;
  // врмененный адрес, так как с акдемии выдает ошибку 400 Bad Request;
  const ESC_CODE = `Escape`;
  const main = document.body.querySelector(`main`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const errorPopup = errorTemplate.cloneNode(true);
  const errorBtn = errorPopup.querySelector(`.error__button`);
  const TIME_OUT = 1000;
  const SUCCESS_CODE = 200;

  const GET_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const POST_URL = `https://ptsv2.com/t/l5tan-1603026502/post`;

  const sendRequest = (methood, url, onSuccess, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(methood, url);

    xhr.addEventListener(`load`, function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError(`Не удалось загрузить данные`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Ошибка загрузки данных`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс`);
    });

    xhr.timeout = TIME_OUT;
    return xhr;
  };

  const onError = (text) => {
    errorPopup.querySelector(`.error__message`).textContent = text;
    main.appendChild(errorPopup);
    errorBtn.addEventListener(`click`, onErrorBtnClick);
    errorBtn.addEventListener(`keydown`, onErrorBtnKeyDown);
  };

  const onErrorBtnClick = () => {
    main.removeChild(errorPopup);
    errorBtn.removeEventListener(`click`, onErrorBtnClick);
    errorBtn.removeEventListener(`keydown`, onErrorBtnKeyDown);
  };

  const onErrorBtnKeyDown = (eventObj) => {
    if (eventObj.code === ESC_CODE) {
      onErrorBtnClick();
    }
  };

  const load = (onSuccessDataReceived) => {
    const xhr = sendRequest(`GET`, GET_URL, onSuccessDataReceived, onError);
    xhr.send();
  };

  const upload = (formData, onSuccessFormSend) => {
    const xhr = sendRequest(`POST`, POST_URL, onSuccessFormSend, onError);
    xhr.send(formData);
  };

  window.xhrModule = {
    load,
    upload,
    onError
  };
})();
