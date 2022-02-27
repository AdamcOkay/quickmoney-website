import "../scss/main.scss";
import "../index.html";
import "../get.html";
import "../return.html";
import "../faq.html";
import "../licenses.html";
import "../legal.html";
import "../about.html";
import "../branches.html";
import "../login.html";
import "../signin.html";
import "../pwd.html";
import Swiper, { Pagination } from "swiper";
import IMask from "imask";

import "../../node_modules/swiper/swiper.scss";

document.addEventListener("DOMContentLoaded", () => {
  // Скрипт вызова/скрытия меню
  const body = document.querySelector("body"),
    hamburger = document.querySelector(".js-hamburger"),
    mainMenu = document.querySelector(".js-main-menu");

  if (mainMenu) {
    // Не дает анимации проигрываться при загрузке страницы
    setTimeout(() => {
      mainMenu.classList.add("menu-body--hidden");
    }, 300);

    hamburger.addEventListener("click", (e) => {
      const target = e.currentTarget;

      body.classList.toggle("no-scroll");
      target.classList.toggle("hamburger--active");
      mainMenu.classList.toggle("menu-body--active");
    });
  }

  // Слайдер отзывов на главной странице
  Swiper.use([Pagination]);

  const reviewsSlider = new Swiper(".js-swiper", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 500,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        spaceBetween: 15,
      },
    },
  });

  // Аккордеоны
  const accordions = document.querySelectorAll(".accordion");
  accordions.forEach((accordion) => {
    const accorionTitle = accordion.querySelector(".accordion__title"),
      accordionBody = accordion.querySelector(".accordion__body");

    accorionTitle.addEventListener("click", () => {
      accordion.classList.toggle("accordion--active");
      if (accordionBody.style.maxHeight) {
        accordionBody.style.maxHeight = null;
      } else {
        accordionBody.style.maxHeight = accordionBody.scrollHeight + 20 + "px";
      }
    });
  });

  // Табы на странице филиалов
  const branchTabs = document.querySelectorAll(".js-branch-tab"),
    tabContents = document.querySelectorAll(".js-branch-content");

  const changeTab = (tab) => {
    const alias = tab.dataset.goto;

    branchTabs.forEach((tab) => {
      tab.classList.remove("branch-tabs__item--active");
    });

    tab.classList.add("branch-tabs__item--active");

    tabContents.forEach((content) => {
      if (content.dataset.tab === alias) {
        content.classList.add("branch-content--active");
      } else {
        content.classList.remove("branch-content--active");
      }
    });

    branchDesktopAccordions();
  };

  branchTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      changeTab(tab, index);
    });
  });

  // Аккордеоны на странице филиалов (десктоп)
  const isDesktop = () => {
    const desktop = window.innerWidth > 1200 ? true : false;

    return desktop;
  };

  // Вызываем функцию перестройки аккордеонов на десктопах
  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(branchDesktopAccordions, 100);
  });

  // функция смены карты на десктопе
  const changeMap = (activeAccordion) => {
    const mapFrame = activeAccordion.querySelector(".map-frame"),
      activeTab = document.querySelector(".branch-content--active"),
      mapBox = activeTab.querySelector(".map-box");

    mapBox.innerHTML = mapFrame.innerHTML;
  };

  const branchAccordionClick = (target, accordions) => {
    accordions.forEach((accordion) => {
      accordion.classList.remove("accordion--active");
    });

    target.classList.add("accordion--active");

    changeMap(target);
  };

  // функция перестройки аккордеонов на десктопах
  const branchDesktopAccordions = () => {
    const desktopDevice = isDesktop();

    // Выходим из функции, если находимся не на странице "Филиалы"
    if (!body.classList.contains("branchespage")) return;

    // Если находимся на странице филиалы, но не на десктопе, возвращаем поведение аккордеонов
    if (desktopDevice !== true) {
      const activeTab = document.querySelector(".branch-content--active"),
        activeAccordion = activeTab.querySelector(".accordion--active"),
        activeBody = activeAccordion.querySelector(".accordion__body"),
        branchAccordions = activeTab.querySelectorAll(".accordion");

      // Сбрасываем высоту тела аккордеонов
      branchAccordions.forEach((accordion) => {
        const branchAccordionBody = accordion.querySelector(".accordion__body");

        branchAccordionBody.style.maxHeight = null;
      });

      // Задаем высоту тела для активного аккордеона
      activeBody.style.maxHeight = activeBody.scrollHeight + 20 + "px";

      return;
    }

    const activeTab = document.querySelector(".branch-content--active"),
      branchAccordions = activeTab.querySelectorAll(".accordion"),
      activeAccordion = activeTab.querySelector(".accordion--active");

    // вставляем нужную карту в блок для карты на десктопе
    changeMap(activeAccordion);

    branchAccordions.forEach((accordion) => {
      const branchAccordionBody = accordion.querySelector(".accordion__body");

      // возвращаем высоту телу аккордеона
      branchAccordionBody.style.maxHeight =
        branchAccordionBody.scrollHeight + 20 + "px";

      accordion.addEventListener("click", (e) => {
        branchAccordionClick(accordion, branchAccordions);

        // переписываем стандартное поведение аккордеона при клике
        branchAccordionBody.style.maxHeight =
          branchAccordionBody.scrollHeight + 20 + "px";
      });
    });
  };

  branchDesktopAccordions();

  const phoneInput = document.getElementById("phone");
  const idInput = document.getElementById("iin");
  const smsInput = document.getElementById("sms-code");

  const maskOptions = {
    mask: "+{7} (000) 000-00-00",
  };
  const idMaskOptions = {
    mask: "000 000 000 000",
  };
  const smsMaskOptions = {
    mask: "000 000",
  };

  if (phoneInput) {
    const mask = IMask(phoneInput, maskOptions);
  }

  if (idInput) {
    const mask = IMask(idInput, idMaskOptions);
  }

  if (smsInput) {
    const mask = IMask(smsInput, smsMaskOptions);
  }

  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    const formInputs = [...form.querySelectorAll("input")],
      submitButton = form.querySelector(`.js-submit-button`);

    formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        const isFormValid = formInputs.every((input) => input.checkValidity());

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
  });

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

  const callButtons = document.querySelectorAll(".js-call-modal");

  callButtons.forEach((button) => {
    button.addEventListener("click", () => {
      callModal(button.dataset.call);
    });
  });
});
