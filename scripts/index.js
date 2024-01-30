const templateElement = document.getElementById("card-template");
const card = templateElement.content.querySelector(".card");

function createCard(cardData, deleteCallback) {
  const clonedCard = card.cloneNode(true);
  const deleteButton = clonedCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    if (deleteCallback) {
      deleteCallback();
    }
  });

  const cardDescr = clonedCard.querySelector(".card__description");
  cardDescr.innerText = cardData.name;

  const cardImg = clonedCard.querySelector(".card__image");
  cardImg.src = cardData.link;
  cardImg.alt = `Красоты мира ${cardData.alt}`;

  return clonedCard;
}

const cardList = document.querySelector(".places__list");

initialCards.forEach(function (cardData) {
  function deleteCard() {
    createdCard.remove();
  }
  const createdCard = createCard(cardData, deleteCard);
  cardList.append(createdCard);
});
