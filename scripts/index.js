// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCard(cardData, deleteCallback) {
  const templateElement = document.getElementById("card-template");
  const card = templateElement.content.querySelector(".card");
  const clonedCard = card.cloneNode(true);
  const deleteButton = clonedCard.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", function () {
    clonedCard.remove();

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
    console.log(`delete! ${cardData.name}`);
  });
  cardList.append(createdCard);
});
