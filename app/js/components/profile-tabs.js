document.addEventListener("DOMContentLoaded", () => {
  const tabControls = document.querySelector(".js-tab-controls");

  if (!tabControls) return;

  const tabButtons = tabControls.querySelectorAll(".js-tab-button"),
    tabContent = document.querySelectorAll(".js-tab-content"),
    goBackButtons = document.querySelectorAll(".js-go-back");

  const handleTabClick = (e) => {
    const target = e.target,
      tabName = target.dataset.tab,
      calledTab = document.querySelector(`[data-content="${tabName}"]`);

    tabButtons.forEach((btn, index) => {
      btn.classList.remove("tab-button--active");
      tabContent[index].classList.remove("tab-content--active");
    });

    target.classList.add("tab-button--active");
    tabControls.classList.add("tab-controls--hidden");
    calledTab.classList.add("tab-content--active");
  };

  goBackButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("sad");
      const activeTab = document.querySelector(".tab-content--active");

      activeTab.classList.remove("tab-content--active");
      tabControls.classList.remove("tab-controls--hidden");
    });
  });

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", handleTabClick);
  });
});
