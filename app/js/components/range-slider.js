import noUiSlider from "nouislider";

document.addEventListener("DOMContentLoaded", () => {
  const rangeSlider = document.getElementById("slider-non-linear-step");

  if (!rangeSlider) return;

  const sliderWrapper = document.querySelector(".js-slider-wrapper"),
    sliderStep = parseInt(sliderWrapper.dataset.step),
    sliderMin = parseInt(sliderWrapper.dataset.min),
    sliderMax = parseInt(sliderWrapper.dataset.max),
    sliderTickFirst = parseInt(sliderWrapper.dataset.tickFirst),
    sliderTickSecond = parseInt(sliderWrapper.dataset.tickSecond);

  noUiSlider.create(rangeSlider, {
    start: [sliderMin],
    connect: [true, false],
    format: {
      to: (v) => v | 0,
      from: (v) => v | 0,
    },
    range: {
      min: [sliderMin, sliderStep],
      "30%": [sliderTickFirst, sliderStep],
      "60%": [sliderTickSecond, sliderStep],
      max: [sliderMax, sliderStep],
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
