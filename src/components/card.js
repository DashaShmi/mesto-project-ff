export function createCard(
  cardData,
  profileId,
  clickCallback,
  deleteCallback,
  likeCallback
) {
  const templateElement = document.getElementById("card-template");
  const card = templateElement.content.querySelector(".card");
  const clonedCard = card.cloneNode(true);
  clonedCard.dataset.id = cardData._id;

  const deleteButton = clonedCard.querySelector(".card__delete-button");
  const cardDescr = clonedCard.querySelector(".card__title");
  cardDescr.innerText = cardData.name;
  const cardImg = clonedCard.querySelector(".card__image");
  cardImg.src = cardData.link;
  cardImg.alt = `Красоты мира ${cardData.alt}`;
  const likesCount = clonedCard.querySelector(".likes__count");

  likesCount.textContent = `${cardData.likes.length}`;

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
      likeCallback(clonedCard, likeButton);
    }
  });

  if (cardData.owner._id !== profileId) {
    deleteButton.remove();
  }

  if (
    cardData.likes.some(function (likersProfile) {
      return likersProfile._id === profileId;
    })
  ) {
    toggleLikeButton(likeButton);
  }
  return clonedCard;
}

export function deleteCard(createdCard) {
  createdCard.remove();
}

// Функция обработчика лайка
export function toggleLikeButton(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
