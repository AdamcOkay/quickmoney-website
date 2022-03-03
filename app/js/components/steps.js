window.showContainer = (prev, next) => {
  const prevContainer = document.querySelector(`[data-container="${prev}"]`),
    nextContainer = document.querySelector(`[data-container="${next}"]`);

  prevContainer.classList.add(`${prev}--hidden`);
  prevContainer.classList.remove(`${prev}--active`);
  nextContainer.classList.add(`${next}--active`);
};
