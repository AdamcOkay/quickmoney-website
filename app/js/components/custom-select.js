import selectSearchTemplate from "./select-search-template";

document.addEventListener("DOMContentLoaded", () => {
  window.findSelects = (select = false) => {
    const customSelects = select
      ? select
      : document.querySelectorAll(".custom-select");

    customSelects.forEach((customSelect) => {
      const selectElement = customSelect.querySelector("select");

      const selectedOption = document.createElement("DIV");

      selectedOption.classList.add("select-selected", "selected-placeholder");
      selectedOption.innerHTML =
        selectElement.options[selectElement.selectedIndex].innerHTML;

      customSelect.appendChild(selectedOption);

      const selectItemsWrapper = document.createElement("DIV");
      selectItemsWrapper.classList.add("select-items-wrapper", "select-hide");

      const selectSearch = selectSearchTemplate;
      selectItemsWrapper.insertAdjacentHTML("afterbegin", selectSearch);

      const selectItems = document.createElement("DIV");
      selectItems.classList.add("select-items");

      for (let i = 1; i < selectElement.length; i++) {
        const selectOption = document.createElement("DIV");
        selectOption.innerHTML = selectElement.options[i].innerHTML;

        selectOption.addEventListener("click", (e) => {
          console.log("asd");
          const target = e.target;

          for (let j = 0; j < selectElement.length; j++) {
            if (target.innerHTML === selectElement.options[j].innerHTML) {
              selectElement.selectedIndex = j;
              selectedOption.innerHTML = target.innerHTML;

              const sameAsSelected =
                selectItems.querySelectorAll(".same-as-selected");
              for (let k = 0; k < sameAsSelected.length; k++) {
                sameAsSelected[k].removeAttribute("class");
              }
              target.setAttribute("class", "same-as-selected");
              break;
            }
          }
          selectedOption.click();
        });

        selectItems.appendChild(selectOption);
      }

      selectItemsWrapper.appendChild(selectItems);
      customSelect.appendChild(selectItemsWrapper);

      selectedOption.addEventListener("click", (e) => {
        e.stopPropagation();
        const target = e.target;

        closeAllSelect(target);
        target.nextSibling.scrollTo({ top: 0 });
        target.nextSibling.classList.toggle("select-hide");
        target.classList.toggle("select-arrow-active");
      });
    });

    const closeAllSelect = (elmnt) => {
      const selectedOption = document.querySelectorAll(".select-selected"),
        selectItemsWrapper = document.querySelectorAll(".select-items-wrapper");

      const arrNo = [];
      for (let i = 0; i < selectedOption.length; i++) {
        if (elmnt === selectedOption[i]) {
          arrNo.push(i);
        } else {
          selectedOption[i].classList.remove("select-arrow-active");
        }
      }

      for (let i = 0; i < selectItemsWrapper.length; i++) {
        if (arrNo.indexOf(i)) {
          selectItemsWrapper[i].classList.add("select-hide");
        }
      }
    };

    document.addEventListener("click", (e) => {
      const selectSearch = e.target.closest(".select-search");

      if (selectSearch) {
        return;
      }

      closeAllSelect(e.target);
    });
  };

  findSelects();
});
