"use strict";
const PHOTO_WIDTH = 40;
const PHOTO_HEIGHT = 45;

const EnglishToRussian = {
  palace: `дворец`,
  bungalow: `бунгало`,
  flat: `квартира`,
  house: `дом`,
};

const mapPinsContainer = document.querySelector(`.map__pins`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const cardArticle = cardTemplate.cloneNode(true);
const featuresPopUp = cardArticle.querySelector(`.popup__features`);
const cardCloseBtn = cardArticle.querySelector(`.popup__close`);

const createPhotos = (img) => {
  const photoContainer = cardArticle.querySelector(`.popup__photos`);
  if (!img.length) {
    hideField(photoContainer);
  } else {
    photoContainer.textContent = ``;
    img.forEach((p) => {
      const photo = document.createElement(`img`);
      photo.classList.add(`popup__photo`);
      photo.src = p;
      photo.width = PHOTO_WIDTH;
      photo.height = PHOTO_HEIGHT;
      photoContainer.append(photo);
      photoContainer.classList.remove(`visually-hidden`);
    });
  }
};

const createFeatures = (feature) => {
  if (!feature.length) {
    hideField(featuresPopUp);
  } else {
    featuresPopUp.textContent = ``;
    feature.forEach((element) => {
      const fragment = document.createDocumentFragment();
      const featuresItem = document.createElement(`li`);
      featuresItem.classList.add(`popup__feature`, `popup__feature--${element}`);
      fragment.appendChild(featuresItem);
      featuresPopUp.appendChild(fragment);
      featuresPopUp.classList.remove(`visually-hidden`);
    });
  }
};

const isEmptyField = (cardField, content) => {
  const field = cardArticle.querySelector(cardField);
  if (content) {
    field.textContent = content;
  } else {
    hideField(field);
  }
};

const hideField = (element) => {
  element.classList.add(`visually-hidden`);
};

const onCardClose = () => {
  mapPinsContainer.removeChild(cardArticle);
  cardCloseBtn.removeEventListener(`click`, onCardClose);
  document.removeEventListener(`keydown`, onEscCardClose);
};

const onEscCardClose = (evt) => {
  if (evt.code === window.code.ESC) {
    onCardClose();
  }
};

const isCardExist = () => {
  const popup = mapPinsContainer.querySelector(`.popup`);
  if (popup) {
    cardCloseBtn.removeEventListener(`click`, onCardClose);
    document.removeEventListener(`keydown`, onEscCardClose);
    mapPinsContainer.removeChild(popup);
  }
};

const lastLetter = (num, word1, word2, word3) => {
  const lastDigit = num % 10;
  const lastSecondDigit = Math.floor((num % 100) / 10);

  if (!(lastSecondDigit === 1)) {
    if (lastDigit === 1) {
      return `${num} ${word1}`;
    } else if (lastDigit > 1 && lastDigit < 5) {
      return `${num} ${word2}`;
    }
  }
  return `${num} ${word3}`;
};

const createCard = (card) => {
  cardArticle.querySelector(`.popup__avatar`).src = card.author.avatar.length ? card.author.avatar : `default.png`;
  isEmptyField(`.popup__title`, card.offer.title);
  isEmptyField(`.popup__text--address`, card.offer.address);
  isEmptyField(`.popup__text--price`, `${card.offer.price} ₽/ночь`);
  isEmptyField(`.popup__type`, EnglishToRussian[card.offer.type]);
  isEmptyField(`.popup__text--time`, `Заезд до ${card.offer.checkin} Выезд после ${card.offer.checkout}`);
  isEmptyField(`.popup__description`, card.offer.description);
  isEmptyField(`.popup__text--capacity`, `${lastLetter(card.offer.rooms, `комната`, `комнаты`, `комнат`)} для ${lastLetter(card.offer.guests, `гостя`, `гостей`, `гостей`)}`);
  createFeatures(card.offer.features);
  createPhotos(card.offer.photos);
  cardCloseBtn.addEventListener(`click`, onCardClose);
  document.addEventListener(`keydown`, onEscCardClose);

  return cardArticle;
};

window.cardModule = {
  createCard,
  isCardExist,
};
