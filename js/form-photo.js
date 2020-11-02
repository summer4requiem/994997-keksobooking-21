"use strict";
(() => {
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  let uploadAvatar = document.querySelector(`.ad-form__field`).querySelector(`input[type=file]`);
  let previewImg = document.querySelector(`.ad-form-header__preview img`);

  let housePicture = document.querySelector(`.ad-form__upload`).querySelector(`input[type=file]`);
  let housePreviewImg = document.querySelector(`.ad-form__photo`);

  const uploadImage = (file, cb) => {
    let imgName = file.name.toLowerCase();

    let isValidImgFormat = FILE_TYPES.some((it) => imgName.endsWith(it));
    if (isValidImgFormat) {
      const reader = new FileReader();
      reader.addEventListener(`load`, function () {
        cb(reader);
      });
      reader.readAsDataURL(file);
    }
  };

  uploadAvatar.addEventListener(`change`, function () {
    let avatar = uploadAvatar.files[0];
    uploadImage(avatar, function (reader) {
      previewImg.src = reader.result;
    });
  });

  const oncPhotosLoad = () => {
    let photos = Array.from(housePicture.files);
    photos.forEach((photo) => {
      uploadImage(photo, function (reader) {
        const image = document.createElement(`img`);
        image.src = reader.result;
        image.style.width = 70 + `px`;
        image.style.height = 70 + `px`;
        housePreviewImg.appendChild(image);
      });
    });
  };

  housePicture.addEventListener(`change`, oncPhotosLoad);
})();
