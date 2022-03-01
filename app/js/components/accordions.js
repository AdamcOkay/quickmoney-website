document.addEventListener("DOMContentLoaded", () => {
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
});
