document.addEventListener("DOMContentLoaded", () => {
  const changeForms = () => {
    const changeForm = document.querySelector(".change-password-form"),
      newForm = document.querySelector(".new-password-form");
    changeForm.style.display = "none";
    newForm.style.display = "block";
  };

  const callModal = (name) => {
    const modal = document.querySelector(`[data-modal="${name}"]`);

    if (modal) {
      modal.classList.add("qm-modal--active");

      modal.addEventListener("click", (e) => {
        const target = e.target;

        if (target.dataset.modalSetting === "close") {
          modal.classList.remove("qm-modal--active");
        }

        if (target.classList.contains("js-change-forms")) {
          changeForms();
        }
      });
    }
  };

  const callButtons = document.querySelectorAll("[data-call]");

  callButtons.forEach((button) => {
    button.addEventListener("click", () => {
      callModal(button.dataset.call);
    });
  });
});
