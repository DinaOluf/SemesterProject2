import {} from "./modules/api.js";
import "./modules/";

// const inputUsername = document.querySelector("#inputUsername");
// const inputEmail = document.querySelector("#inputEmail");
// const inputPassword = document.querySelector("#inputPassword");
const form = document.querySelector("form");

//  INDIVIDUAL VALIDATIONS
// function validateEmail(email) {
//     const regEx = /^[\w\-.]+@stud.?noroff.no$/;
//     const patternMatches = regEx.test(email);
//     return patternMatches;
//   }

//   function validatePassword(password) {
//     const regEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
//     const patternMatches = regEx.test(password);
//     return patternMatches;
//   }

// VALIDATE INPUTS
function validateSignUp(e) {
  e.preventDefault();

  //     const userInput = {
  //       name: inputUsername.value.trim(),
  //       email: inputEmail.value,
  //       password: inputPassword.value,
  //     };

  //     if (inputUsername.value.trim().length < 4) {
  //       const usernameHelp = document.querySelector("#usernameHelp");
  //       usernameHelp.style.color = "#FF6F6C";
  //     } else {
  //       usernameHelp.style.color = "";
  //     }

  //     if (!validateEmail(inputEmail.value)) {
  //       const emailHelp = document.querySelector("#emailHelp");
  //       emailHelp.style.color = "#FF6F6C";
  //     } else {
  //       emailHelp.style.color = "";
  //     }

  //     if (!validatePassword(inputPassword.value)) {
  //       const passwordHelp = document.querySelector("#passwordHelp");
  //       passwordHelp.style.color = "#FF6F6C";
  //     } else {
  //       passwordHelp.style.color = "";
  //     }

  //     if (
  //       inputUsername.value.trim().length >= 4 &&
  //       validateEmail(inputEmail.value) &&
  //       validatePassword(inputPassword.value)
  //     ) {
  //       postSignUp(REG_URL, userInput);
  //     }
}

form.addEventListener("submit", validateSignUp);
