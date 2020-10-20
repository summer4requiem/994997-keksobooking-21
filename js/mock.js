// "use strict";
// (() => {
//   const TOTAL_OBJECTS = 8;
//   const LOCATION_X_MIN = 0;
//   const LOCATION_X_MAX = 1200;
//   const LOCATION_Y_MIN = 130;
//   const LOCATION_Y_MAX = 630;

//   const PRICE = [200, 300, 500, 600, 700];
//   const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
//   const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

//   const createAdvertisementArray = () => {
//     let advertisements = [];
//     for (let i = 1; i <= TOTAL_OBJECTS; i++) {
//       advertisements.push({
//         author: {
//           avatar: `img/avatars/user0${i}.png`,
//         },
//         offer: {
//           title: `Заголовок`,
//           // eslint-disable-next-line no-undef
//           address: `${getRandom.range(LOCATION_X_MIN, LOCATION_X_MAX)}, ${getRandom.range(LOCATION_X_MIN, LOCATION_X_MAX)}`,
//           // eslint-disable-next-line no-undef
//           price: getRandom.arrayItem(PRICE),
//           type: `palace`,
//           rooms: 2,
//           guests: 2,
//           checkin: `12:00`,
//           checkout: `13:00`,
//           // eslint-disable-next-line no-undef
//           features: getRandom.lengthArr(features),
//           description: `Великолепная квартира в центре Токио`,
//           // eslint-disable-next-line no-undef
//           photos: getRandom.lengthArr(PHOTOS),
//         },
//         location: {
//           // eslint-disable-next-line no-undef
//           x: getRandom.range(LOCATION_X_MIN, LOCATION_X_MAX),
//           // eslint-disable-next-line no-undef
//           y: getRandom.range(LOCATION_Y_MIN, LOCATION_Y_MAX),
//         }
//       });
//     }

//     return advertisements;
//   };

//   window.createAdvertisement = createAdvertisementArray;
// })();

