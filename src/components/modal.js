export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

function closeByEscape(event) {
  if (event.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}
