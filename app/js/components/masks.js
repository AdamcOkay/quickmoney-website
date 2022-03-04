import IMask from "imask";

document.addEventListener("DOMContentLoaded", () => {
  window.addMasks = () => {
    const phoneInputs = document.querySelectorAll(".phone-input");
    const cardInputs = document.querySelectorAll(".card-input");
    const billsInputs = document.querySelectorAll(".bill-input");
    const idInput = document.getElementById("doc-id");
    const smsInput = document.getElementById("sms-code");

    const maskOptions = {
      mask: "+{7} (000) 000-00-00",
    };

    const idMaskOptions = {
      mask: "000 000 000 000",
    };

    const smsMaskOptions = {
      mask: "000 000",
    };

    const cardMaskOptions = {
      mask: "0000",
    };

    const billMaskOptions = {
      mask: "**** **** *** **** ****",
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

    if (idInput) {
      const mask = IMask(idInput, idMaskOptions);
    }

    if (smsInput) {
      const mask = IMask(smsInput, smsMaskOptions);
    }
  };

  addMasks();
});
