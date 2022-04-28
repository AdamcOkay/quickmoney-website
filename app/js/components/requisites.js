document.addEventListener("DOMContentLoaded", () => {
  const requisitesBody = document.querySelectorAll(".js-requisites");

  requisitesBody.forEach((body) => {
    if (body) {
      const bodyInputs = [...body.querySelectorAll("input")];
      bodyInputs.forEach((input) => {
        input.addEventListener("input", () => {
          const isFormValid = bodyInputs.every((input) =>
            input.checkValidity()
          );

          if (isFormValid) {
            body.classList.add("requisites-body--filled");
          } else {
            body.classList.remove("requisites-body--filled");
          }
        });
      });
    }
  });
});
