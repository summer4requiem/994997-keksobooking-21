"use strict";
(function () {
  const TOTAL_OBJECTS = 8;

  const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const photos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  window.createAdvertisementArray = () => {
    let adv = [];
    for (let index = 0; index < TOTAL_OBJECTS; index++) {
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
          photos: window.getRandomArrayItem(photos),
        },
        location: {
          x: window.getRandomRange(200, 600),
          y: window.getRandomRange(130, 630),
        }
      });
    }
    return adv;
  };
})();
