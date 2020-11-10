"use strict";

const mapFilters = document.querySelector(`.map__filters`);
const houseFilter = mapFilters.querySelector(`#housing-type`);
const roomFilter = mapFilters.querySelector(`#housing-rooms`);
const guestsFilter = mapFilters.querySelector(`#housing-guests`);
const priceFilter = mapFilters.querySelector(`#housing-price`);
let newPins = [];

const getPinsArray = (data) => {
  window.pinsArray = data;
};

const filterField = (field, data, key) => {
  return field.value === `any` ? true : field.value === data[key].toString();
};

const filerType = (item) => {
  return filterField(houseFilter, item.offer, `type`);
};

const filerRooms = (item) => {
  return filterField(roomFilter, item.offer, `rooms`);
};

const filerGuests = (item) => {
  return filterField(guestsFilter, item.offer, `guests`);
};

const filterFeatures = (item) => {
  const features = mapFilters.querySelectorAll(`input:checked`);
  return Array.from(features).every((el) => item.offer.features.includes(el.value));
};

const filterPrice = (item) => {
  const currentPrice = window.PriceLimit[priceFilter.value];
  return currentPrice ? item.offer.price >= currentPrice.min && item.offer.price <= currentPrice.max : true;
};

const filterParams = window.debounce(() => {
  newPins = window.pinsArray.slice(0);
  newPins = window.pinsArray.filter(filerType).filter(filterPrice).filter(filerRooms).filter(filerGuests).filter(filterFeatures);
  window.pinModule.renderPins(newPins.slice(0, 5));
});

mapFilters.addEventListener(`change`, () => {
  window.updatePins();
  window.cardModule.isCardExist();
  filterParams();
});
window.xhrModule.load(getPinsArray);
