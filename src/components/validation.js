export function enableValidation(options) {
  // functions
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(options.inputErrorClass);
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = "-";
  }

  function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(options.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(options.errorClass);
  }

  const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
      // встроенный метод setCustomValidity принимает на вход строку
      // и заменяет ею стандартное сообщение об ошибке
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      // если передать пустую строку, то будут доступны
      // стандартные браузерные сообщения
      inputElement.setCustomValidity("");
    }
    if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement, options);
    } else {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        options
      );
    }
  };

  const setEventListeners = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(options.inputSelector)
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, options);
        const button = formElement.querySelector(options.submitButtonSelector);
        toggleButtonState(inputList, button);
      });
    });
  };

  function enableButton(buttonElement) {
    buttonElement.disabled = true;
    buttonElement.classList.add(options.inactiveButtonClass);
  }

  function disableButton(buttonElement) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(options.inactiveButtonClass);
  }

  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      enableButton(buttonElement);
    } else {
      // иначе сделай кнопку активной
      disableButton(buttonElement);
    }
  };

  function clearValidation(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(options.inputSelector)
    );
    inputList.forEach((input) => {
      hideInputError(formElement, input);
    });

    const button = formElement.querySelector(options.submitButtonSelector);
    disableButton(button);
  }

  // Validation activation
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, options);
  });

  return {
    clearValidation: clearValidation,
  };
}

// Функция валидности всех полей (принимает массив полей)
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};
