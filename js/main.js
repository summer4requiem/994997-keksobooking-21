"use strict";
const TOTAL_OBJECTS = 8;

const PIN_WIDTH = 40;
const PIN_HEIGHT = 40;
const LEFT_MOUSE_CLICK_KEY_CODE = 1;
const ENTER_CODE = `Enter`;

const LOCATION_X_MIN = 10;
const LOCATION_X_MAX = 1000;
const LOCATION_Y_MIN = 130;
const LOCATION_Y_MAX = 630;

const addressInput = document.querySelector(`#address`);


let mapPinsContainer = document.querySelector(`.map__pins`);
let mainPin = document.querySelector(`.map__pin--main`);
let adForm = document.querySelector(`.ad-form`);
adForm.classList.add(`ad-form--disabled`);
let fieldSets = adForm.querySelectorAll(`fieldset`);


// fieldSets.forEach((field) => {
//   field.disabled = true;
// });


const removeDisablePageAttributes = (eventObj) => {
  fieldSets.forEach((field) => {
    field.disabled = false;
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
  });

  addressInput.value = (570 + 22) + ` x ` + (375 + 10) + ` y`;
};

const onMouseDownActivatePage = (eventObj) => {
  if (eventObj.buttons === LEFT_MOUSE_CLICK_KEY_CODE) {
    removeDisablePageAttributes(eventObj);
  }
};

const onKeyDownAcrivatePage = (eventObj) => {
  if (eventObj.code === ENTER_CODE) {
    removeDisablePageAttributes(eventObj);
  }
};

mainPin.addEventListener(`mousedown`, onMouseDownActivatePage);
mainPin.addEventListener(`keydown`, onKeyDownAcrivatePage);

let map = document.querySelector(`.map`);

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];


const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const getRandomLengthArr = (arr) => {
  const randomArray = [];
  for (let i = 0; i < window.getRandomRange(1, arr.length); i++) {
    randomArray.push(arr[i]);
  }
  return randomArray;
};

const createAdvertisementArray = () => {
  let advertisements = [];
  for (let i = 0; i < TOTAL_OBJECTS; i++) {
    advertisements.push({
      author: {
        avatar: `img/avatars/user0` + [i + 1] + `.png`,
      },
      offer: {
        title: `Заголовок`,
        address: `Ленина 202`,
        price: 200,
        type: `palace`,
        rooms: 2,
        guests: 2,
        checkin: `12:00`,
        checkout: `13:00`,
        features: getRandomLengthArr(features),
        description: `Великолепная квартира в центре Токио`,
        photos: getRandomLengthArr(PHOTOS),
      },
      location: {
        x: window.getRandomRange(LOCATION_X_MIN, LOCATION_X_MAX),
        y: window.getRandomRange(LOCATION_Y_MIN, LOCATION_Y_MAX),
      }
    });
  }

  return advertisements;
};


const createPin = (pin) => {
  const pinImg = pinTemplate.cloneNode(true);
  pinImg.style.left = pin.location.x + `px`;
  pinImg.style.top = pin.location.y + `px`;
  pinImg.querySelector(`img`).src = pin.author.avatar;
  pinImg.style.alt = pin.description;
  return pinImg;
};

const renderPins = () => {
  const fragment = document.createDocumentFragment();
  const pins = createAdvertisementArray();
  for (let index = 0; index < TOTAL_OBJECTS; index++) {
    fragment.appendChild(createPin(pins[index]));
  }
  mapPinsContainer.appendChild(fragment);
};


// const renderCard = (card) => {
//   let cardArticle = cardTemplate.cloneNode(true);
//   cardArticle.querySelector(`.popup__avatar`).src = card.author.avatar;
//   cardArticle.querySelector(`.popup__title`).textContent = card.offer.title;
//   cardArticle.querySelector(`.popup__text--address`).textContent = card.offer.address;
//   cardArticle.querySelector(`.popup__text--price`).textContent = card.offer.price + `₽/ночь`;
//   cardArticle.querySelector(`.popup__type`).textContent = card.offer.type;
//   cardArticle.querySelector(`.popup__text--time`).textContent = `Заезд до ` + card.offer.checkin + ` Выезд после` + card.offer.checkout;
//   let featuresList = cardArticle.querySelector(`.popup__features`);
//   cardArticle.querySelector(`.popup__description`).textContent = card.offer.description;
//   featuresList.textContent = ``;

//   card.offer.features.forEach((element) => {
//     const fragment = document.createDocumentFragment();
//     let featuresItem = document.createElement(`li`);
//     featuresItem.classList.add(`popup__feature`, `popup__feature` + `--` + element);
//     fragment.appendChild(featuresItem);
//     featuresList.appendChild(fragment);
//   });


//   let photoContainer = cardArticle.querySelector(`.popup__photos`);
//   photoContainer.textContent = ``;

//   card.offer.photos.forEach((p) => {
//     let photo = document.createElement(`img`);
//     photo.classList.add(`popup__photo`);
//     photo.src = p;
//     photo.width = PIN_WIDTH;
//     photo.height = PIN_HEIGHT;
//     photoContainer.append(photo);
//   });

//   return cardArticle;
// };


// const showCard = () => {
//   const fragment = document.createDocumentFragment();
//   fragment.appendChild(renderCard(createAdvertisementArray()[0]));
//   map.append(fragment);
// };

// showCard();
renderPins();
