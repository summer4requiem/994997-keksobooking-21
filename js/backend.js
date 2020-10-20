"use strict";
(() => {
  const SUCCESS_CODE = 200;
  // const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const TIME_OUT = 1000;
  const GET_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  // const POST_URL = `https://21.javascript.pages.academggy/keksobooking`;
  // врмененный адрес, так как с акдемии выдает ошибку 400 Bad Request;
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
      onError(`Error`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс`);
    });

    xhr.timeout = TIME_OUT;

    return xhr;
  };

  const onError = (text) => {
    const errorMessage = errorTemplate.cloneNode(true);
    errorMessage.querySelector(`.error__message`).textContent = text;
    const errorBtn = errorMessage.querySelector(`.error__button`);
    errorBtn.addEventListener(`click`, onErrorMessageClose);
    document.body.appendChild(errorMessage);
  };

  const onErrorMessageClose = () => {
    const errorMessage = document.querySelector(`.error`);
    document.body.removeChild(errorMessage);
    const errorBtn = errorMessage.querySelector(`.error__button`);
    errorBtn.removeEventListener(`click`, onErrorMessageClose);
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
