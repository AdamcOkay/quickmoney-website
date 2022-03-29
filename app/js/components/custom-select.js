document.addEventListener("DOMContentLoaded", () => {
  window.findSelects = (select = false) => {
    let x, i, j, l, ll, selElmnt, a, b, c;

    x = select ? select : document.getElementsByClassName("custom-select");
    l = select ? 1 : x.length;
    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;

      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);

      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < ll; j++) {
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", (e) => {
          const target = e.target;
          let y, i, k, s, h, sl, yl;

          s = target.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = target.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == target.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = target.innerHTML;
              y = target.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              target.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", (e) => {
        e.stopPropagation();
        const target = e.target;

        closeAllSelect(target);
        target.nextSibling.scrollTo({ top: 0 });
        target.nextSibling.classList.toggle("select-hide");
        target.classList.toggle("select-arrow-active");
      });
    }

    const closeAllSelect = (elmnt) => {
      let x,
        y,
        i,
        xl,
        yl,
        arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    };

    document.addEventListener("click", closeAllSelect);
  };

  findSelects();
});
