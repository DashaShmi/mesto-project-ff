function createCard(cardData, deleteCallback) {
  const templateElement = document.getElementById("card-template");
  const card = templateElement.content.querySelector(".card");
  const clonedCard = card.cloneNode(true);
  const deleteButton = clonedCard.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", function () {
    if (deleteCallback) {
      deleteCallback();
    }
  });

  const cardDescr = clonedCard.querySelector(".card__description");
  cardDescr.innerText = cardData.name;

  const cardLink = clonedCard.querySelector(".card__image");
  cardLink.src = cardData.link;

  return clonedCard;
}

const cardList = document.querySelector(".places__list");

initialCards.forEach(function (cardData) {
  const createdCard = createCard(cardData, function () {
    createdCard.remove();
  });
  cardList.append(createdCard);
});
