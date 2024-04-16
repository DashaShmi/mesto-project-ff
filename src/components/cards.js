export const initialCards = [
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

export function createCard(
  cardData,
  clickCallback,
  deleteCallback,
  likeCallback
) {
  const templateElement = document.getElementById("card-template");
  const card = templateElement.content.querySelector(".card");
  const clonedCard = card.cloneNode(true);
  const deleteButton = clonedCard.querySelector(".card__delete-button");
  const cardDescr = clonedCard.querySelector(".card__title");
  cardDescr.innerText = cardData.name;
  const cardImg = clonedCard.querySelector(".card__image");
  cardImg.src = cardData.link;
  cardImg.alt = `Красоты мира ${cardData.alt}`;

  deleteButton.addEventListener("click", function () {
    if (deleteCallback) {
      deleteCallback(clonedCard);
    }
  });

  cardImg.addEventListener("click", function () {
    if (clickCallback) {
      clickCallback(cardData);
    }
  });

  const likeButton = clonedCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    if (likeCallback) {
      likeCallback(likeButton);
    }
  });

  return clonedCard;
}

export function deleteCard(createdCard) {
  createdCard.remove();
}

// Функция обработчика лайка
export function handleLikeButton(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
