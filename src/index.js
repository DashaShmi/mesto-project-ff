import { initialCards } from "./cards.js";

const templateElement = document.getElementById("card-template");
const card = templateElement.content.querySelector(".card");
const cardList = document.querySelector(".places__list");

import "./index.css";

function createCard(cardData, deleteCallback) {
  const clonedCard = card.cloneNode(true);
  const deleteButton = clonedCard.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", function () {
    if (deleteCallback) {
      deleteCallback(clonedCard);
    }
  });

  const cardDescr = clonedCard.querySelector(".card__description");
  cardDescr.innerText = cardData.name;

  const cardImg = clonedCard.querySelector(".card__image");
  cardImg.src = cardData.link;
  cardImg.alt = `Красоты мира ${cardData.alt}`;

  return clonedCard;
}

function deleteCard(createdCard) {
  createdCard.remove();
}

initialCards.forEach(function (cardData) {
  const createdCard = createCard(cardData, deleteCard);
  cardList.append(createdCard);
});

const openProfileEditButton = document.querySelector(".profile__edit-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");

// const cardAddButton = document.querySelector("profile__add-button");

// Функции для открытия/закрытия модального окна "редактирования профиля"

openProfileEditButton.addEventListener("click", function () {
  document.querySelector(".popup_type_edit").style.display = "flex";
});

popupCloseButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const modalsProfile = document.querySelectorAll(".popup");
    modalsProfile.forEach(function (modal) {
      modal.style.display = "none";
    });
  });
});

document
  .querySelector(".profile__add-button")
  .addEventListener("click", function () {
    document.querySelector(".popup_type_new-card").style.display = "flex";
  });
