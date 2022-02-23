import "../scss/main.scss";
import "../index.html";
import "../get.html";
import "../return.html";
import Swiper, { Pagination } from "swiper";

import "../../node_modules/swiper/swiper.scss";

Swiper.use([Pagination]);
const reviewsSlider = new Swiper(".js-swiper", {
  speed: 400,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // Responsive breakpoints
  breakpoints: {
    768: {
      spaceBetween: 15,
    },
  },
});
