import { LOGIN_URL } from "./modules/api.js";
import { loginSignup } from "./modules/loginSignup.js";

const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const rememberCheck = document.querySelector("#rememberCheck");
const form = document.querySelector("form");

if (localStorage.getItem("email")) {
    emailInput.value = localStorage.getItem("email");
}

function validateLogin(e) {
  e.preventDefault();

  if(rememberCheck.checked && emailInput.value) {
    localStorage.setItem("email", emailInput.value);
  } else if (!rememberCheck.checked && localStorage.getItem("email")) {
    localStorage.removeItem("email");
  } 

    const userInput = {
    email: emailInput.value,
    password: passwordInput.value,
    };

    loginSignup(LOGIN_URL, userInput);
}

form.addEventListener("submit", validateLogin);
