// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardData1 = {
  name: "Архыз",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
};

const cardData2 = {
  name: "Челябинская область",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
};

function createCard(cardData) {
  const templateElement = document.getElementById("card-template");
  const card = templateElement.content.querySelector(".card");
  const clonedCard = card.cloneNode(true);
  const deleteButton = clonedCard.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    console.log(`вы нажали удалить ${cardData.name}`);
    clonedCard.remove();
  });

  const cardDescr = clonedCard.querySelector(".card__description");
  cardDescr.innerText = cardData.name;

  const cardLink = clonedCard.querySelector(".card__image");
  cardLink.src = cardData.link;

  return clonedCard;
}
const createdCard = createCard(cardData1);
const createdCard2 = createCard(cardData2);

const cardList = document.querySelector(".places__list");
cardList.append(createdCard);
cardList.append(createdCard2);
