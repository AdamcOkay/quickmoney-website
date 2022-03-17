document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    const formInputs = [...form.querySelectorAll("input")],
      submitButton = form.querySelector(`.js-submit-button`);

    if (submitButton) {
      formInputs.forEach((input) => {
        input.addEventListener("input", () => {
          const isFormValid = formInputs.every((input) =>
              input.checkValidity()
            ),
            extendModalInfo = form.querySelector(".extend-info");

          if (isFormValid) {
            submitButton.disabled = false;
            if (extendModalInfo) {
              extendModalInfo.style.opacity = 1;
            }
          } else {
            submitButton.disabled = true;
          }

          if (input.classList.contains("error-input")) {
            const inputWrapper = input.parentElement,
              errorMessage = inputWrapper.nextElementSibling;

            input.classList.remove("error-input");
            errorMessage.remove();
          }

          if (input.value.length > 0) {
            input.classList.add("edited-input");
          } else {
            input.classList.remove("edited-input");
          }

          if (form.classList.contains("verification-form") && isFormValid) {
            submitButton.textContent = "Подтвердить";
          }
        });
      });
    }
  });

  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    if (!dropdown) return;

    dropdown.addEventListener("click", (e) => {
      const target = e.target,
        choosenItem = dropdown.querySelector(".choosen-item"),
        item = target.closest(".item");

      dropdown.classList.add("dropdown--active");
      if (target !== item) return;

      choosenItem.innerHTML = item.innerHTML;
      dropdown.classList.remove("dropdown--active");
    });
  });

  const codeRows = document.querySelectorAll(".js-code-row");

  codeRows.forEach((row) => {
    const inputs = row.querySelectorAll("input");

    if (!row) return;

    inputs.forEach((input, index) => {
      input.addEventListener("keydown", () => {
        if (input.checkValidity() && inputs[index + 1]) {
          inputs[index + 1].focus();
        }

        if (input.value.length <= 0 && inputs[index - 1]) {
          inputs[index - 1].focus();
        }
      });
    });
  });

  const loginForm = document.querySelector(".js-login-form");

  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const loginInputs = loginForm.querySelectorAll("input"),
      loginButton = loginForm.querySelector(".js-submit-button");

    loginInputs.forEach((input) => {
      const inputWrapper = input.parentNode,
        prevErrorMessage = inputWrapper.nextElementSibling;

      // удаляем существующий текст ошибки, если он есть
      if (prevErrorMessage) {
        prevErrorMessage.remove();
      }
      const errorMessage = `<p class="error-message">Текст ошибки снизу инпута. Текст может быть длинным</p>`;
      inputWrapper.insertAdjacentHTML("afterend", errorMessage);
      input.classList.add("error-input");
    });

    loginButton.disabled = true;
  });
});
