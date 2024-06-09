"use strict";
//////////////////// Dom Elements Declarations ///////////////////
var signInSection = document.querySelector("#signin");
var signInEmail = document.querySelector("#signin-email");
var signInPassword = document.querySelector("#signin-password");
var signInBtn = document.querySelector("#signin-btn");
var signInEmailError = document.querySelector("#invalid-email");
var signInPasswordError = document.querySelector("#invalid-password");

///////////////////////////////////////////////////////////////////
//////////////////////////// Variables ///////////////////////////
var errors = [signInEmailError, signInPasswordError];
var inputs = [signInEmail, signInPassword];
var users, signInEmailCorrect, signInPasswordCorrect;

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}

//////////////////////////////////////////////////////////////////
/////////////////////////// Functions ///////////////////////////
function reset() {
  errors.forEach(function (ele) {
    ele.classList.add("d-none");
  });
  inputs.forEach(function (ele) {
    ele.value = "";
  });
}

function signInValid() {
  signInEmailCorrect = signInPasswordCorrect = false;
  signInBtn.removeAttribute("href");
  for (var i = 0; i < users.length; i++) {
    if (signInEmail.value === users[i].userEmail) {
      signInEmailCorrect = true;
      if (signInPassword.value === users[i].userPassword) {
        signInPasswordCorrect = true;
        localStorage.setItem("currentUser", users[i].userName);
        break;
      }
    }
  }
  if (signInPasswordCorrect) {
    signInBtn.setAttribute("href", "home.html");
  }
}

//////////////////////////////////////////////////////////////////
///////////////////////// Event Listners ////////////////////////
signInEmail.addEventListener("input", signInValid);
signInPassword.addEventListener("input", signInValid);

signInBtn.addEventListener("click", function () {
  if (!signInEmailCorrect) {
    signInEmailError.classList.remove("d-none");
    signInPasswordError.classList.add("d-none");
  } else if (!signInPasswordCorrect) {
    signInEmailError.classList.add("d-none");
    signInPasswordError.classList.remove("d-none");
  } else {
    reset();
  }
});
