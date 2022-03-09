document.addEventListener("DOMContentLoaded", () => {
  const tabControls = document.querySelector(".js-tab-controls");

  if (!tabControls) return;

  const tabButtons = tabControls.querySelectorAll(".js-tab-button"),
    tabContent = document.querySelectorAll(".js-tab-content"),
    goBackButtons = document.querySelectorAll(".js-go-back");

  const handleTabClick = (e) => {
    const target = e.target,
      tabName = target.dataset.tab,
      calledTab = document.querySelector(`[data-content="${tabName}"]`);

    tabButtons.forEach((btn, index) => {
      btn.classList.remove("tab-button--active");
      tabContent[index].classList.remove("tab-content--active");
      tabContent[index].classList.remove("tab-content--first");
    });

    target.classList.add("tab-button--active");
    tabControls.classList.add("tab-controls--hidden");
    calledTab.classList.add("tab-content--active");
  };

  goBackButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const activeTab = document.querySelector(".tab-content--active");

      activeTab.classList.remove("tab-content--active");
      tabControls.classList.remove("tab-controls--hidden");
    });
  });

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", handleTabClick);
  });

  const contactsTab = document.querySelector(
      '.js-tab-content[data-content="contacts"]'
    ),
    dictionary = ["Первый", "Второй", "Третий", "Четвертый", "Пятый", "Шестой"];

  contactsTab.addEventListener("click", (e) => {
    const target = e.target,
      addContactButton = target.closest(".js-add-button"),
      removeContactButton = target.closest(".js-remove-contact");

    if (addContactButton) {
      const contactsWrapper = contactsTab.querySelector(".contacts-wrapper"),
        contactCount = contactsWrapper.children.length,
        template = `
      <div class="input-row contact-row">
        <div class="contact-title-block">
          <h3 class="contact-title">
            <span class="contact-count">${
              dictionary[contactCount]
            }</span> контакт:
          </h3>
          <button type="button" class="button-reset remove-button js-remove-contact">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M0 2.66666L2.66667 0L16 13.3333L13.3333 16L0 2.66666Z"
                fill="#D9D9D9"
              />
              <path
                d="M2.66667 16L2.6974e-06 13.3333L13.3333 1.37118e-05L16 2.66668L2.66667 16Z"
                fill="#D9D9D9"
              />
            </svg>
          </button>
        </div>
        <div class="input-col">
          <div class="input-wrapper">
            <input
              type="text"
              id="contact-name-${contactCount + 1}"
              name="contact-name-${contactCount + 1}"
              required
            />
            <label class="input-label" for="contact-name-${contactCount + 1}"
              >Имя</label
            >
          </div>
        </div>
        <div class="input-col">
          <div class="input-wrapper">
            <div class="custom-select added-select">
              <select name="contact-who-${contactCount + 1}" id="contact-who-${
          contactCount + 1
        }">
                <option value="0">Кем приходится</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </div>
        <div class="input-col">
          <div class="input-wrapper">
            <input
              type="tel"
              id="contact-phone-${contactCount + 1}"
              name="contact-phone-${contactCount + 1}"
              class="phone-input"
              required
            />
            <label class="input-label" for="contact-phone-${contactCount + 1}"
              >Номер телефона</label
            >
          </div>
        </div>
      </div>`;

      if (contactCount === 5) {
        addContactButton.style.display = "none";
      }

      if (contactCount >= 6) {
        return;
      }

      contactsWrapper.insertAdjacentHTML("beforeend", template);

      const addedSelect = document.getElementsByClassName("added-select");

      addMasks();
      findSelects(addedSelect);
      addedSelect[0].classList.remove("added-select");
    }

    if (removeContactButton) {
      const addContactButton = contactsTab.querySelector(".js-add-button");
      addContactButton.style.display = "block";

      removeContactButton.closest(".contact-row").remove();

      const contacts = document.querySelectorAll(".contact-row");

      contacts.forEach((contact, index) => {
        const contactCount = contact.querySelector(".contact-count"),
          contactName = contact.querySelector('input[type="text"'),
          nameLabel = contactName.nextElementSibling,
          contactSelect = contact.querySelector("select"),
          contactPhone = contact.querySelector('input[type="tel"'),
          phoneLabel = contactPhone.nextElementSibling;

        contactCount.textContent = dictionary[index];

        contactName.id = `contact-name-${index + 1}`;
        contactName.name = `contact-name-${index + 1}`;
        nameLabel.setAttribute("for", `contact-name-${index + 1}`);

        contactSelect.id = `contact-who-${index + 1}`;
        contactSelect.name = `contact-who-${index + 1}`;

        contactPhone.id = `contact-phone-${index + 1}`;
        contactPhone.name = `contact-phone-${index + 1}`;
        phoneLabel.setAttribute("for", `contact-phone-${index + 1}`);
      });
    }
  });
});
