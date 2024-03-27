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
const popupCloseButton = document.querySelector(".popup__close");
const modal = document.querySelector(".popup");

// Функции для открытия/закрытия модального окна "редактирования профиля"

openProfileEditButton.addEventListener("click", function () {
  modal.style.display = "flex";
});

popupCloseButton.addEventListener("click", function () {
  modal.style.display = "none";
});

const openAddCard = document.querySelector(".profile__add-button");
const modalMesto = document.querySelector(".popup_type_new-card");

openAddCard.addEventListener("click", function () {
  modalMesto.style.display = "flex";
});

popupCloseButton.addEventListener("click", function () {
  modalMesto.style.display = "none";
});
