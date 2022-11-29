import { REG_URL } from "./modules/api.js";
import { loginSignup } from "./modules/loginSignup.js";

const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const form = document.querySelector("form");

//  INDIVIDUAL VALIDATIONS
function validateEmail(email) {
    const regEx = /^[\w\-.]+@stud.?noroff.no$/;
    const patternMatches = regEx.test(email);
    return patternMatches;
  }

  function validatePassword(password) {
    const regEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    const patternMatches = regEx.test(password);
    return patternMatches;
  }

// VALIDATE INPUTS
function validateSignUp(e) {
  e.preventDefault();

    //FEEDBACK
    const nameFeedback = document.querySelector("#nameFeedback");
    const emailFeedback = document.querySelector("#emailFeedback");
    const passwordFeedback = document.querySelector("#passwordFeedback");

    if (nameInput.value.trim().length < 4) {
        nameFeedback.style.color = "#BEA6FF";
    } else {
        nameFeedback.style.color = "";
    }

    if (!validateEmail(emailInput.value)) {
        emailFeedback.style.color = "#BEA6FF";
    } else {
        emailFeedback.style.color = "";
    }

    if (!validatePassword(passwordInput.value)) {
        passwordFeedback.style.color = "#BEA6FF";
    } else {
        passwordFeedback.style.color = "";
    }

    const userInput = {
    name: nameInput.value.trim(),
    email: emailInput.value,
    password: passwordInput.value,
    };

    if (
    nameInput.value.trim().length >= 4 &&
    validateEmail(emailInput.value) &&
    validatePassword(passwordInput.value)
    ) {
    loginSignup(REG_URL, userInput);
    }
}

form.addEventListener("submit", validateSignUp);
