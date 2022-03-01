import IMask from "imask";

document.addEventListener("DOMContentLoaded", () => {
  const phoneInputs = document.querySelectorAll(".phone-input");
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

  phoneInputs.forEach((input) => {
    if (input) {
      const mask = IMask(input, maskOptions);
    }
  });

  if (idInput) {
    const mask = IMask(idInput, idMaskOptions);
  }

  if (smsInput) {
    const mask = IMask(smsInput, smsMaskOptions);
  }
});
