import {
  initialCards,
  createCard,
  deleteCard,
  handleLikeButton,
} from "./components/cards";
import "./index.css";

import { openPopupFromImg, closePopup, openPopup } from "./components/modal";

const cardList = document.querySelector(".places__list");

initialCards.forEach(function (cardData) {
  const createdCard = createCard(
    cardData,
    openPopupFromImg,
    deleteCard,
    handleLikeButton
  );
  cardList.append(createdCard);
});

const openProfileEditButton = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".popup__input_type_name");
const descrInput = document.querySelector(".popup__input_type_description");
const nameProfile = document.querySelector(".profile__title");
const descrProfile = document.querySelector(".profile__description");
const profileForm = document.querySelector(".popup__form[name='edit-profile']");

// Функции для открытия модального окна "редактирования профиля"
openProfileEditButton.addEventListener("click", function () {
  const popup = document.querySelector(".popup_type_edit");
  openPopup(popup);
  nameInput.value = nameProfile.textContent;
  descrInput.value = descrProfile.textContent;
});

// Обработчик отправки формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descrProfile.textContent = descrInput.value;
  closeAllPopups();
}
profileForm.addEventListener("submit", handleFormSubmit);

// Функция закрытия всех попапов
function closeAllPopups() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach(closePopup);
}

// Закрытие попапов на esc
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape" || evt.keyCode === 27) {
    closeAllPopups();
  }
});

// Функция закрытия попапов на крестик
const popupCloseButtons = document.querySelectorAll(".popup__close");
popupCloseButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    closeAllPopups();
  });
});

// Функции для открытия модального окна "добавить новое место"
document
  .querySelector(".profile__add-button")
  .addEventListener("click", function () {
    const popup = document.querySelector(".popup_type_new-card");
    openPopup(popup);
  });

// Обработчик отправки формы для окна "добавить новое место"
const nameInputNewPlace = document.querySelector(
  ".popup__input_type_card-name"
);
const urlInput = document.querySelector(".popup__input_type_url");
const formNewPlace = document.querySelector(".popup__form[name='new-place']");

function handleFormNewPlaсe(evt) {
  evt.preventDefault();
  const name = nameInputNewPlace.value;
  const url = urlInput.value;
  const cardDataNewPlace = {
    name: name,
    link: url,
  };
  const createdCard = createCard(
    cardDataNewPlace,
    openPopupFromImg,
    deleteCard,
    handleLikeButton
  );
  cardList.prepend(createdCard);
  closeAllPopups();
  // debugger;
}
formNewPlace.addEventListener("submit", handleFormNewPlaсe);

// Закрытие попапа кликом на оверлей
const popups = document.querySelectorAll(".popup");
popups.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
});
