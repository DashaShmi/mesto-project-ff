const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "2798e004-6d38-4fe5-b840-9ed182b5c951",
    "Content-Type": "application/json",
  },
};

function handleResponse(reponsePromise) {
  return reponsePromise.then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function getMe() {
  const reponsePromise = fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });

  return handleResponse(reponsePromise);
}

export function getCards() {
  const reponsePromise = fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
  return handleResponse(reponsePromise);
}

export function saveProfile(profileData) {
  const reponsePromise = fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(profileData),
  });
  return handleResponse(reponsePromise);
}

export function saveNewCard(cardData) {
  const reponsePromise = fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(cardData),
  });
  return handleResponse(reponsePromise);
}

export function deleteCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

export function addLike(cardId) {
  const reponsePromise = fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
  return handleResponse(reponsePromise);
}

export function deleteLike(cardId) {
  const reponsePromise = fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
  return handleResponse(reponsePromise);
}

export function updateAvatar(avatarData) {
  const reponsePromise = fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(avatarData),
  });
  return handleResponse(reponsePromise);
}
