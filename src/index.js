import { createCard, deleteCard, toggleLikeButton } from "./components/card";
import "./index.css";
import {
  getMe,
  getCards,
  saveProfile,
  saveNewCard,
  deleteCardFromServer,
  addLike,
  deleteLike,
  updateAvatar,
} from "./components/api";
import { closePopup, openPopup } from "./components/modal";
import { enableValidation } from "./components/validation";

// popups
const bigImagePopup = document.querySelector(".popup_type_image");
const profilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
// forms
const profileForm = document.querySelector(".popup__form[name='edit-profile']");
const formNewPlace = document.querySelector(".popup__form[name='new-place']");
const profileAvatar = document.querySelector(".profile__image");
// профиль
const profileEditButton = document.querySelector(".profile__edit-button");
const profileNameInput = document.querySelector(".popup__input_type_name");
const profileDescrInput = document.querySelector(
  ".popup__input_type_description"
);
let profileId = "-";
const profileName = document.querySelector(".profile__title");
const profileDescr = document.querySelector(".profile__description");
//новое место
const newPlaceNameInput = document.querySelector(
  ".popup__input_type_card-name"
);
const newPlaceUrlInput = document.querySelector(".popup__input_type_url");
// остальное
const cardList = document.querySelector(".places__list");
//

// Функции для открытия модального окна "редактирования профиля"
profileEditButton.addEventListener("click", function () {
  clearValidation(profileForm);
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

  saveProfile({
    name: profileNameInput.value,
    about: profileDescrInput.value,
  });
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

  saveNewCard(cardDataNew).then((serverCardData) => {
    const createdCard = createCard(
      serverCardData,
      profileId,
      openPopupFromImg,
      deleteCardOnClick,
      toggleLikeOnClick
    );
    cardList.prepend(createdCard);
  });
  closePopup(newCardPopup);
  newPlaceNameInput.value = "";
  newPlaceUrlInput.value = "";
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

const validationFunctions = enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  inactiveButtonClass: "popup__button_inactive",
});

// Это мне жеско подсказали как сделать чтобы clearValidation была видна
const clearValidation = validationFunctions.clearValidation;

const profilePromise = getMe();
const cardsPromise = getCards();

const dataPromise = Promise.all([profilePromise, cardsPromise]);

dataPromise.then((data) => {
  console.log(data);
  const profileData = data[0];
  const cardsData = data[1];

  profileName.textContent = profileData.name;
  profileDescr.textContent = profileData.about;
  profileAvatar.style.backgroundImage = `url(${profileData.avatar})`;
  profileId = profileData._id;

  cardsData.forEach(function (cardData) {
    const createdCard = createCard(
      cardData,
      profileId,
      openPopupFromImg,
      deleteCardOnClick,
      toggleLikeOnClick
    );
    cardList.append(createdCard);
  });
});

function deleteCardOnClick(createdCard) {
  deleteCard(createdCard);
  deleteCardFromServer(createdCard.dataset.id);
}

function toggleLikeOnClick(createdCard, buttonLike, likeCountElement) {
  toggleLikeButton(buttonLike);

  // надо:
  // если нет лайка - отправить на серкер лайк
  // если есть лайк - удалить на серере лайк

  // только добавляет лайк
  addLike(createdCard.dataset.id).then((cardData) => {
    likeCountElement.innerText = cardData.likes.length;
  });
}
