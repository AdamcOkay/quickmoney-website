import Swiper, { Pagination } from "swiper";

import "../../../node_modules/swiper/swiper.scss";

document.addEventListener("DOMContentLoaded", () => {
  Swiper.use([Pagination]);

  const reviewsSlider = new Swiper(".js-swiper", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 500,
    },
    spaceBetween: 15,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});
