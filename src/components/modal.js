// Функция открытия попапа, если пыкать на карточу
export function openPopupFromImg(cardData) {
  const popupTypeImage = document.querySelector(".popup_type_image");
  popupTypeImage.classList.add("popup_is-opened");

  const popupImage = document.querySelector(".popup__image");
  popupImage.src = cardData.link;

  const popupDescr = document.querySelector(".popup__caption");
  popupDescr.innerText = cardData.name;
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}
