import { dbank_backend } from "../../declarations/dbank_backend";

window.addEventListener("load", async function () {
  console.log("finished loading");

  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
});

document.querySelector("form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const button = document.getElementById("submit-btn");
  button.setAttribute("disabled", true);

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  if (!isNaN(inputAmount) && inputAmount > 0) {
    await dbank_backend.topUp(inputAmount);
  }

  if (!isNaN(outputAmount) && outputAmount > 0) {
    await dbank_backend.withDraw(outputAmount); 
  }

  await dbank_backend.compound();

  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  button.removeAttribute("disabled"); 
});
