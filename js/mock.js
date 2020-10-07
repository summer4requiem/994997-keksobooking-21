"use strict";
(function () {
  const TOTAL_OBJECTS = 8;
  const LOCATION_X_MIN = 10;
  const LOCATION_X_MAX = 1000;
  const LOCATION_Y_MIN = 130;
  const LOCATION_Y_MAX = 630;
  const PRICE = [200, 300, 500, 600, 700];
  const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

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
          price: getRandom.arrayItem(PRICE),
          type: `palace`,
          rooms: 2,
          guests: 2,
          checkin: `12:00`,
          checkout: `13:00`,
          features: getRandom.lengthArr(features),
          description: `Великолепная квартира в центре Токио`,
          photos: getRandom.lengthArr(PHOTOS),
        },
        location: {
          x: getRandom.range(LOCATION_X_MIN, LOCATION_X_MAX),
          y: getRandom.range(LOCATION_Y_MIN, LOCATION_Y_MAX),
        }
      });
    }

    return advertisements;
  };

  window.createAdvertisement = {
    array: createAdvertisementArray,
  };

})();
