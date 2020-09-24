"use strict";
const MAX_ADV_COUNT = 8;
let map = document.querySelector(`.map`);

let mapPinsContainer = map.querySelector(`.map__pins`);
map.classList.remove(`map--faded`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];


let createAdvertisementArray = () => {
  let adv = [];
  for (let index = 0; index < MAX_ADV_COUNT; index++) {
    adv.push({
      author: {
        avatar: `img/avatars/user0` + window.getRandomRange(1, 8) + `.png`,
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
        features: window.getRandomArrayItem(features),
        description: `строка с описанием`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
      },
      location: {
        x: window.getRandomRange(200, 600),
        y: window.getRandomRange(130, 630),
      }
    });
  }
  return adv;
};


const renderPin = (pin) => {
  let pinImg = pinTemplate.cloneNode(true);
  pin.map((p) => {
    pinImg.style.left = p.location.x + `px`;
    pinImg.style.top = p.location.y + `px`;
    pinImg.querySelector(`img`).src = p.author.avatar;

  });

  return pinImg;
};


const fragment = document.createDocumentFragment();
for (let index = 0; index < MAX_ADV_COUNT; index++) {
  fragment.appendChild(renderPin(createAdvertisementArray()));
}

mapPinsContainer.appendChild(fragment);
