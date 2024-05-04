import { createCard, deleteCard, handleLikeButton } from "./components/card";
import "./index.css";

import { initialCards } from "./components/cards";

import { closePopup, openPopup } from "./components/modal";

// popups
const bigImagePopup = document.querySelector(".popup_type_image");
const profilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
// forms
const profileForm = document.querySelector(".popup__form[name='edit-profile']");
const formNewPlace = document.querySelector(".popup__form[name='new-place']");
// профиль
const profileEditButton = document.querySelector(".profile__edit-button");
const profileNameInput = document.querySelector(".popup__input_type_name");
const profileDescrInput = document.querySelector(
  ".popup__input_type_description"
);
const profileName = document.querySelector(".profile__title");
const profileDescr = document.querySelector(".profile__description");
//новое место
const newPlaceNameInput = document.querySelector(
  ".popup__input_type_card-name"
);
const newPlaceUrlInput = document.querySelector(".popup__input_type_url");
// остальное
const cardList = document.querySelector(".places__list");

// Функции для открытия модального окна "редактирования профиля"
profileEditButton.addEventListener("click", function () {
  openPopup(profilePopup);
  profileNameInput.value = profileName.textContent;
  profileDescrInput.value = profileDescr.textContent;
});

// Функция открытия попапа, если пыкать на карточу
function openPopupFromImg(cardData) {
  openPopup(bigImagePopup);

  const popupImage = document.querySelector(".popup__image");
  popupImage.src = cardData.link;

  const popupDescr = document.querySelector(".popup__caption");
  popupDescr.innerText = cardData.name;
}

// Обработчик отправки формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescr.textContent = profileDescrInput.value;
  closePopup(profilePopup);
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Функция закрытия попапов на крестик
const popupCloseButtons = document.querySelectorAll(".popup__close");
popupCloseButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

// Функции для открытия модального окна "добавить новое место"
document
  .querySelector(".profile__add-button")
  .addEventListener("click", function () {
    openPopup(newCardPopup);
  });

// Обработчик отправки формы для окна "добавить новое место"
function handleFormNewPlaсe(evt) {
  evt.preventDefault();
  const name = newPlaceNameInput.value;
  const url = newPlaceUrlInput.value;
  const cardDataNew = {
    name: name,
    link: url,
  };
  const createdCard = createCard(
    cardDataNew,
    openPopupFromImg,
    deleteCard,
    handleLikeButton
  );
  cardList.prepend(createdCard);
  closePopup(newCardPopup);
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

// юлпбнанал
initialCards.forEach(function (cardData) {
  const createdCard = createCard(
    cardData,
    openPopupFromImg,
    deleteCard,
    handleLikeButton
  );
  cardList.append(createdCard);
});

// для упрощения теста
// убрать потом
openPopup(profilePopup);

function hideInputError(formElement, inputElement, options) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = "-";
}

function showInputError(formElement, inputElement, errorMessage, options) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
}

const checkInputValidity = (formElement, inputElement, options) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, options);
  } else {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      options
    );
  }
};

// checkInputValidity(editProfileForm, descriptionInput);

const setEventListeners = (formElement, options) => {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, options);
    });
  });
};

functionc(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
});
