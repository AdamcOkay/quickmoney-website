document.addEventListener("DOMContentLoaded", () => {
  // Табы на странице филиалов
  const body = document.querySelector("body"),
    branchTabs = document.querySelectorAll(".js-branch-tab"),
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
  // let resizeTimer;

  // window.addEventListener("resize", () => {
  //   clearTimeout(resizeTimer);
  //   resizeTimer = setTimeout(branchDesktopAccordions, 100);
  // });

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
});
