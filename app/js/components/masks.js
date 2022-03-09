import IMask from "imask";

document.addEventListener("DOMContentLoaded", () => {
  window.addMasks = () => {
    const phoneInputs = document.querySelectorAll(".phone-input");
    const cardInputs = document.querySelectorAll(".card-input");
    const billsInputs = document.querySelectorAll(".bill-input");
    const idInput = document.querySelectorAll(".doc-id");
    const idNumInput = document.querySelectorAll(".id-num");
    const smsInput = document.querySelectorAll(".sms-code");
    const dateInput = document.querySelectorAll(".id-exp-date");

    const maskOptions = {
      mask: "+{7} (000) 000-00-00",
    };

    const idMaskOptions = {
      mask: "000 000 000 000",
    };

    const idNumMaskOptions = {
      mask: "000000000",
    };

    const smsMaskOptions = {
      mask: "000 000",
    };

    const cardMaskOptions = {
      mask: "0000",
    };

    const dateMaskOptions = {
      mask: "00.00.0000",
    };

    const billMaskOptions = {
      mask: "#### #### #### #### ####",
      definitions: {
        // <any single char>: <same type as mask (RegExp, Function, etc.)>
        // defaults are '0', 'a', '*'
        "#": /^[A-Za-z0-9]+$/,
      },
    };

    phoneInputs.forEach((input) => {
      if (input) {
        const mask = IMask(input, maskOptions);
      }
    });

    cardInputs.forEach((input) => {
      if (input) {
        const mask = IMask(input, cardMaskOptions);
      }
    });

    billsInputs.forEach((input) => {
      if (input) {
        const mask = IMask(input, billMaskOptions);
      }
    });

    idInput.forEach((input) => {
      if (input) {
        const mask = IMask(input, idMaskOptions);
      }
    });

    idNumInput.forEach((input) => {
      if (input) {
        const mask = IMask(input, idNumMaskOptions);
      }
    });

    smsInput.forEach((input) => {
      if (input) {
        const mask = IMask(input, smsMaskOptions);
      }
    });

    dateInput.forEach((input) => {
      if (input) {
        const mask = IMask(input, dateMaskOptions);
      }
    });
  };

  addMasks();
});
