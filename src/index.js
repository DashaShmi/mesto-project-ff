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
