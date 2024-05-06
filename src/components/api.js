export function getMe() {
  const reponsePromise = fetch(
    "https://nomoreparties.co/v1/wff-cohort-12/users/me",
    {
      headers: {
        authorization: "2798e004-6d38-4fe5-b840-9ed182b5c951",
      },
    }
  );
  const jsonPromise = reponsePromise.then((res) => res.json());
  const resultPromise = jsonPromise.then((result) => {
    console.log(result);
    return result;
  });

  return resultPromise;
}

export function getCards() {
  return fetch(" https://nomoreparties.co/v1/wff-cohort-12/cards", {
    headers: {
      authorization: "2798e004-6d38-4fe5-b840-9ed182b5c951",
    },
  }).then((res) => {
    return res.json();
  });
}

export function saveProfile(profileData) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-12/users/me", {
    method: "PATCH",
    headers: {
      authorization: "2798e004-6d38-4fe5-b840-9ed182b5c951",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });
}
