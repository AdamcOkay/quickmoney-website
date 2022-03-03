document.addEventListener("DOMContentLoaded", () => {
  const pageBody = document.querySelector(".id-page");

  if (!pageBody) return;

  const nextButton = document.querySelector(".js-id-next");

  nextButton.addEventListener("click", (event) => {
    event.preventDefault;
    showContainer("scan-container", "result");
  });
});
