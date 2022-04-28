document.addEventListener("DOMContentLoaded", () => {
  const detailsContainer = document.querySelector(".js-card-details");

  if (!detailsContainer) return;

  const addButton = detailsContainer.querySelector(".js-add-details"),
    editButton = detailsContainer.querySelector(".js-edit-details"),
    displayContent = detailsContainer.querySelector(".display-content"),
    addContent = detailsContainer.querySelector(".js-add"),
    addContentInputs = [...addContent.querySelectorAll("input")],
    editContent = detailsContainer.querySelector(".js-edit"),
    backButtons = detailsContainer.querySelectorAll(".js-go-back");

  if (addButton) {
    addButton.addEventListener("click", () => {
      displayContent.style.display = "none";
      addContent.style.display = "block";
    });
  }

  if (editButton) {
    editButton.addEventListener("click", () => {
      displayContent.style.display = "none";
      editContent.style.display = "block";
    });
  }

  if (backButtons) {
    backButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const curContent =
          btn.dataset.back === "add" ? addContent : editContent;

        curContent.style.display = "none";
        displayContent.style.display = "block";
      });
    });
  }

  if (addContent) {
    addContentInputs.forEach((input) => {
      input.addEventListener("input", () => {
        const isFormValid = addContentInputs.every((input) =>
          input.checkValidity()
        );

        if (isFormValid) {
          addContent.classList.add("add-filled");
        } else {
          addContent.classList.remove("add-filled");
        }
      });
    });
  }

  const cardTemplate = `
    <div class="item-body">
        <div class="input-grid">
            <input
            type="text"
            pattern="\d*"
            maxlength="4"
            class="card-input"
            readonly
            />
            <input
            type="text"
            pattern="\d*"
            maxlength="4"
            class="card-input"
            readonly
            />
            <input
            type="text"
            pattern="\d*"
            maxlength="4"
            class="card-input"
            readonly
            />
            <input
            type="text"
            pattern="\d*"
            maxlength="4"
            class="card-input"
            readonly
            />
        </div>
        <div class="logos">
            <div class="service">
                <img src="../assets/icons/profileIcons/visa.png" alt="visa" />
            </div>
            <div class="bank">
                <img src="../assets/icons/profileIcons/kaspi.png" alt="kaspi" />
            </div>
        </div>
        <button class="button-reset edit-button js-edit-details">
            Редактировать карту
        </button>
    </div> `;

  const billTemplate = `
    <div class="item-body bill-body">
      <input type="text" maxlength="23" class="bill-input" readonly/>
      <div class="logos">
        <div class="bank">
          <img
            src="../assets/icons/profileIcons/kaspi.png"
            alt="kaspi"
          />
        </div>
      </div>
      <button class="button-reset edit-button js-edit-details">
        Редактировать карту
      </button>
    </div>`;
});
