"use strict";

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const uploadAvatar = document.querySelector(`.ad-form__field`).querySelector(`input[type=file]`);
const previewImg = document.querySelector(`.ad-form-header__preview img`);
const housePicture = document.querySelector(`.ad-form__upload`).querySelector(`input[type=file]`);
const housePreviewImg = document.querySelector(`.ad-form__photo`);
const imgParam = {
  width: 70,
  height: 70,
};

const uploadImage = (file, cb) => {
  const imgName = file.name.toLowerCase();

  const isValidImgFormat = FILE_TYPES.some((it) => imgName.endsWith(it));
  if (isValidImgFormat) {
    const reader = new FileReader();
    reader.addEventListener(`load`, () => {
      cb(reader);
    });
    reader.readAsDataURL(file);
  }
};

uploadAvatar.addEventListener(`change`, () => {
  const avatar = uploadAvatar.files[0];
  uploadImage(avatar, (reader) => {
    previewImg.src = reader.result;
  });
});

const onPhotosLoad = () => {
  const photos = Array.from(housePicture.files);
  photos.forEach((photo) => {
    uploadImage(photo, (reader) => {
      const image = document.createElement(`img`);
      image.src = reader.result;
      image.style.width = `${imgParam.width} px`;
      image.style.height = `${imgParam.height} px`;
      housePreviewImg.appendChild(image);
    });
  });
};

housePicture.addEventListener(`change`, onPhotosLoad);
