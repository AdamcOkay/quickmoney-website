import "./range-slider";

document.addEventListener("DOMContentLoaded", () => {
  const pageBody = document.querySelector(".application-page");

  if (!pageBody) return;

  const infoContainer = document.querySelector(".info-container"),
    sumContainer = document.querySelector(".sum-container"),
    stepsForm = document.querySelector(".js-step-form"),
    stepsList = stepsForm.querySelectorAll(".step-list__item"),
    submitButton = stepsForm.querySelector(".js-application-submit");

  const isValid = (inputArray) => {
    const allValid = inputArray.every((input) => input.checkValidity());

    return allValid;
  };

  let currentStep = stepsForm.querySelector(".step-list__item--active");

  let counter = 0;

  const dictionary = [
    "Первый",
    "Второй",
    "Третий",
    "Четвертый",
    "Пятый",
    "Шестой",
  ];
  stepsForm.addEventListener("click", (e) => {
    const target = e.target;

    const nextButton = target.closest(".js-step-next"),
      backButton = target.closest(".js-step-back"),
      pagination = stepsForm.querySelectorAll(".js-step-pagination"),
      stepCount = stepsForm.querySelector(".js-step-count"),
      probabilityCount = stepsForm.querySelector(".js-probability-count"),
      addContactButton = target.closest(".js-add-button");

    currentStep = target.closest(".step-list__item--active");

    if (!currentStep) return;

    if (nextButton) {
      if (!stepsList[counter + 1]) {
        infoContainer.classList.add("info-container--disabled");
        sumContainer.classList.add("sum-container--active");

        return;
      }

      counter++;

      if (!stepsList[counter]) return;

      pagination[counter - 1].classList.remove("step-pagination__item--active");
      pagination[counter - 1].classList.add("step-pagination__item--passed");

      pagination[counter].classList.add("step-pagination__item--active");

      stepCount.textContent = counter + 1;
      probabilityCount.textContent =
        stepsList[counter].dataset.stepProbability + "%";

      currentStep.classList.remove("step-list__item--active");
      stepsList[counter].classList.add("step-list__item--active");

      currentStep = stepsList[counter];
      listenToInputs(currentStep);
    }

    if (backButton) {
      if (!stepsList[counter - 1]) return;

      counter--;

      pagination[counter + 1].classList.remove("step-pagination__item--active");
      pagination[counter + 1].classList.remove("step-pagination__item--passed");

      pagination[counter].classList.remove("step-pagination__item--passed");
      pagination[counter].classList.add("step-pagination__item--active");

      stepCount.textContent = counter + 1;
      probabilityCount.textContent =
        stepsList[counter].dataset.stepProbability + "%";

      currentStep.classList.remove("step-list__item--active");
      stepsList[counter].classList.add("step-list__item--active");

      currentStep = stepsList[counter];
      listenToInputs(currentStep);
    }

    if (addContactButton) {
      const contactsWrapper = stepsForm.querySelector(".contacts-wrapper"),
        contactCount = contactsWrapper.children.length,
        template = `
      <div class="input-row">
        <h3 class="contact-title">
          <span class="contact-count">${
            dictionary[contactCount]
          }</span> контакт:
        </h3>
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
      listenToInputs(currentStep);
      addedSelect[0].classList.remove("added-select");

      const currentStepNextButton = currentStep.querySelector(".js-step-next");
      currentStepNextButton.disabled = true;
    }
  });

  const listenToInputs = (step) => {
    const currentStepInputs = step.querySelectorAll("input");

    currentStepInputs.forEach((input) => {
      let inputsAreValid;
      const nextButton = step.querySelector(".js-step-next");

      input.addEventListener("input", () => {
        inputsAreValid = isValid([...currentStepInputs]);

        if (inputsAreValid) {
          nextButton.disabled = false;
        } else {
          nextButton.disabled = true;
        }
      });
    });
  };

  listenToInputs(currentStep);

  stepsForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    showContainer("application-form", "loading");
    loadingAnimation();
  });

  const loadingContainer = document.querySelector(".loading"),
    circle = loadingContainer.querySelector(".progress-ring--active circle"),
    radius = circle.r.baseVal.value,
    circumference = radius * 2 * Math.PI,
    loadingPercent = loadingContainer.querySelector(".js-loading-percent");

  const setProgress = (percent) => {
    setTimeout(function () {
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;

      loadingPercent.textContent = percent + "%";

      if (percent === 100) {
        showContainer("loading", "result");
      }
    }, 30 * percent);
  };

  const loadingAnimation = () => {
    circle.style.strokeDashoffset = `${circumference}`;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;

    for (let i = 0; i <= 100; i++) {
      setProgress(i);
    }
  };
});
