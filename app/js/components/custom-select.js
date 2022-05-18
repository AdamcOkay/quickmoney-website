import selectSearchTemplate from "./select-search-template";

document.addEventListener("DOMContentLoaded", () => {
  window.findSelects = (select = false) => {
    const customSelects = select
      ? select
      : document.querySelectorAll(".custom-select");

    for (let index = 0; index < customSelects.length; index++) {
      const selectElement = customSelects[index].querySelector("select");

      const selectedOption = document.createElement("DIV");

      selectedOption.classList.add("select-selected", "selected-placeholder");

      const selectLabel = document.createElement("DIV");
      selectLabel.classList.add("select-label");

      selectLabel.innerHTML = selectElement.options[0].innerHTML;

      const selectedOptionItem = document.createElement("DIV");
      selectedOptionItem.classList.add("select-selected__item");
      selectedOptionItem.innerHTML =
        selectElement.options[selectElement.selectedIndex].innerHTML;

      selectedOption.appendChild(selectLabel);
      selectedOption.appendChild(selectedOptionItem);

      customSelects[index].appendChild(selectedOption);

      const selectItemsWrapper = document.createElement("DIV");
      selectItemsWrapper.classList.add("select-items-wrapper", "select-hide");

      const selectSearch = selectSearchTemplate;
      selectItemsWrapper.insertAdjacentHTML("afterbegin", selectSearch);

      const selectItems = document.createElement("DIV");
      selectItems.classList.add("select-items");

      for (let i = 1; i < selectElement.length; i++) {
        const selectOption = document.createElement("DIV");
        selectOption.classList.add("js-select-item");
        selectOption.innerHTML = selectElement.options[i].innerHTML;

        selectOption.addEventListener("click", (e) => {
          const target = e.target;

          selectedOption.classList.add("select-active");

          for (let j = 0; j < selectElement.length; j++) {
            if (target.innerHTML === selectElement.options[j].innerHTML) {
              selectElement.selectedIndex = j;
              selectedOptionItem.innerHTML = target.innerHTML;

              const sameAsSelected =
                selectItems.querySelectorAll(".same-as-selected");
              for (let k = 0; k < sameAsSelected.length; k++) {
                sameAsSelected[k].classList.remove("same-as-selected");
              }
              target.classList.add("same-as-selected", "js-select-item");
              break;
            }
          }
          selectedOption.click();
        });

        selectItems.appendChild(selectOption);
      }

      selectItemsWrapper.appendChild(selectItems);
      customSelects[index].appendChild(selectItemsWrapper);

      const searchInput =
          customSelects[index].querySelector(".js-select-search"),
        resetBtn = customSelects[index].querySelector(".js-search-reset"),
        searchIcon = customSelects[index].querySelector(".search-icon"),
        resetIcon = customSelects[index].querySelector(".reset-icon");

      searchInput.addEventListener("input", () => {
        if (searchInput.value.length > 0) {
          resetBtn.disabled = false;
          searchIcon.classList.add("icon-hidden");
          resetIcon.classList.remove("icon-hidden");
        } else {
          resetBtn.disabled = true;
          resetIcon.classList.add("icon-hidden");
          searchIcon.classList.remove("icon-hidden");
        }

        searchItems(searchInput);
      });

      resetBtn.addEventListener("click", () => {
        searchInput.value = "";
        resetBtn.disabled = true;
        resetIcon.classList.add("icon-hidden");
        searchIcon.classList.remove("icon-hidden");

        searchItems(searchInput);
      });

      selectedOption.addEventListener("click", (e) => {
        e.stopPropagation();
        const target = e.currentTarget;

        closeAllSelect(target);
        target.nextSibling.scrollTo({ top: 0 });
        target.nextSibling.classList.toggle("select-hide");
        target.classList.toggle("select-arrow-active");
      });
    }

    const searchItems = (input) => {
      const filterInputValue = input.value.toUpperCase(),
        selectItems = document.querySelectorAll(".js-select-item");

      for (let i = 0; i < selectItems.length; i++) {
        const txtValue = selectItems[i].textContent || selectItems[i].innerText;

        if (txtValue.toUpperCase().indexOf(filterInputValue) > -1) {
          selectItems[i].style.display = "";
        } else {
          selectItems[i].style.display = "none";
        }
      }
    };

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
