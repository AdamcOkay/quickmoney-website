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
});
