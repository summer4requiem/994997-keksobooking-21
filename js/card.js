"use strict";
(() => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const PIN_WIDTH = 40;
  const PIN_HEIGHT = 40;
  const mapPinsContainer = document.querySelector(`.map__pins`);

  const createCard = (card) => {
    const cardArticle = cardTemplate.cloneNode(true);
    const closeArticleBtn = cardArticle.querySelector(`.popup__close`);

    const onPopupClose = () => {
      mapPinsContainer.removeChild(cardArticle);
      closeArticleBtn.removeEventListener(`click`, onPopupClose);
    };

    const removeCard = () => {
      let popup = mapPinsContainer.querySelector(`.popup`);
      if (popup) {
        popup.querySelector(`.popup__close`).removeEventListener(`click`, onPopupClose);
        mapPinsContainer.removeChild(popup);
      }
    };

    removeCard();

    cardArticle.querySelector(`.popup__avatar`).src = card.author.avatar;
    cardArticle.querySelector(`.popup__title`).textContent = card.offer.title;
    cardArticle.querySelector(`.popup__text--address`).textContent = card.offer.address;
    cardArticle.querySelector(`.popup__text--price`).textContent = card.offer.price + `₽/ночь`;
    cardArticle.querySelector(`.popup__type`).textContent = card.offer.type;
    cardArticle.querySelector(`.popup__text--time`).textContent = `Заезд до ` + card.offer.checkin + ` Выезд после` + card.offer.checkout;
    let featuresList = cardArticle.querySelector(`.popup__features`);
    cardArticle.querySelector(`.popup__description`).textContent = card.offer.description;
    featuresList.textContent = ``;

    card.offer.features.forEach((element) => {
      const fragment = document.createDocumentFragment();
      let featuresItem = document.createElement(`li`);
      featuresItem.classList.add(`popup__feature`, `popup__feature` + `--` + element);
      fragment.appendChild(featuresItem);
      featuresList.appendChild(fragment);
    });

    let photoContainer = cardArticle.querySelector(`.popup__photos`);
    photoContainer.textContent = ``;

    card.offer.photos.forEach((p) => {
      let photo = document.createElement(`img`);
      photo.classList.add(`popup__photo`);
      photo.src = p;
      photo.width = PIN_WIDTH;
      photo.height = PIN_HEIGHT;
      photoContainer.append(photo);
    });

    closeArticleBtn.addEventListener(`click`, onPopupClose);
    return cardArticle;
  };



  window.cardModule = {
    createCard,
  };
})();
