import noUiSlider from "nouislider";

document.addEventListener("DOMContentLoaded", () => {
  const pageBody = document.querySelector(".application-page");

  if (!pageBody) return;

  const rangeSlider = document.getElementById("slider-non-linear-step");

  noUiSlider.create(rangeSlider, {
    start: [10000],
    connect: [true, false],
    format: {
      to: (v) => v | 0,
      from: (v) => v | 0,
    },
    range: {
      min: [10000, 10000],
      "30%": [50000, 10000],
      "60%": [100000, 5000],
      max: [145000, 5000],
    },
    pips: {
      mode: "range",
      density: 100,
    },
  });

  const pips = rangeSlider.querySelectorAll(".noUi-value");

  const clickOnPip = (e) => {
    const target = e.target,
      value = parseInt(target.getAttribute("data-value"));

    rangeSlider.noUiSlider.set(value);
  };

  for (var i = 0; i < pips.length; i++) {
    pips[i].addEventListener("click", clickOnPip);
    pips[i].textContent =
      pips[i].dataset.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₸";
  }
  pips[0].classList.add("first-pip");
  pips[pips.length - 1].classList.add("last-pip");

  const sum = document.querySelector(".js-total-sum");

  rangeSlider.noUiSlider.on("update", function (values, handle) {
    sum.textContent =
      values[handle].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₸";
  });
});
