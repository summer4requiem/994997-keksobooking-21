"use strict";
(() => {
  const TIME_OUT = 1000;
  const POST_URL = `https://21.javascript.pages.academy/keksobooking`;
  const GET_URL = `https://21.javascript.pages.academy/keksobooking/data`;

  const main = document.body.querySelector(`main`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const errorPopup = errorTemplate.cloneNode(true);
  const errorBtn = errorPopup.querySelector(`.error__button`);
  const errorLoadTemplate = document.querySelector(`#load-error`).content.querySelector(`.load-error`);
  const errorLoadPopUp = errorLoadTemplate.cloneNode(true);
  const errorLoadBtn = errorLoadPopUp.querySelector(`.error__button`);

  const sendRequest = (method, url, onSuccess, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(method, url);

    xhr.addEventListener(`load`, function () {
      if (xhr.status === window.code.SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError(`Не удалось отправить данные`);
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

  const onUploadDataErrorShowMessage = (text) => {
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

  const onErrorBtnKeyDown = (evt) => {
    if (evt.code === window.code.ESC) {
      onErrorBtnClick();
    }
  };

  const onLoadDataErrorShowMessage = () => {
    main.appendChild(errorLoadPopUp);
    errorLoadBtn.addEventListener(`click`, onErrorLoadBtnClick);
    errorLoadBtn.addEventListener(`keydown`, onErrorLoadBtnKeyDown);
  };

  const onErrorLoadBtnClick = () => {
    main.removeChild(errorLoadPopUp);
    errorLoadBtn.removeEventListener(`click`, onErrorLoadBtnClick);
    errorLoadBtn.removeEventListener(`keydown`, onErrorLoadBtnKeyDown);
  };

  const onErrorLoadBtnKeyDown = (evt) => {
    if (evt.code === window.code.ESC) {
      onErrorLoadBtnClick();
    }
  };

  const load = (onSuccessDataReceived) => {
    const xhr = sendRequest(`GET`, GET_URL, onSuccessDataReceived, onLoadDataErrorShowMessage);
    xhr.send();
  };

  const upload = (formData, onSuccessFormSend) => {
    const xhr = sendRequest(`POST`, POST_URL, onSuccessFormSend, onUploadDataErrorShowMessage);
    xhr.send(formData);
  };

  window.xhrModule = {
    load,
    upload,
    onUploadDataErrorShowMessage,
  };
})();
