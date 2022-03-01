import noUiSlider from "nouislider";

document.addEventListener("DOMContentLoaded", () => {
  const rangeSlider = document.getElementById("slider-non-linear-step");

  noUiSlider.create(rangeSlider, {
    start: [10000],
    connect: [true, false],
    range: {
      min: [10000, 10000],
      "25%": [50000, 10000],
      "75%": [100000, 5000],
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
  }
  pips[0].classList.add("first-pip");
  pips[pips.length - 1].classList.add("last-pip");
});
