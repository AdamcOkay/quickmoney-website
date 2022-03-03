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
          );

          if (isFormValid) {
            submitButton.disabled = false;
          } else {
            submitButton.disabled = true;
          }

          if (form.classList.contains("verification-form") && isFormValid) {
            submitButton.textContent = "Подтвердить";
          }
        });
      });
    }
  });
});
