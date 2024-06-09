"use strict";
//////////////////// Dom Elements Declarations ///////////////////
var signUpSection = document.querySelector("#signup");
var signUpName = document.querySelector("#signup-name");
var signUpEmail = document.querySelector("#signup-email");
var signUpPassword = document.querySelector("#signup-password");
var allInputsError = document.querySelector("#all-inputs");
var usedEmailError = document.querySelector("#used-email");
var signUpBtn = document.querySelector("#signup-btn");
var modalBtn = document.querySelector("#modal-btn");
///////////////////////////////////////////////////////////////////
//////////////////////////// Variables ///////////////////////////
var errors = [allInputsError, usedEmailError];
var inputs = [signUpName, signUpEmail, signUpPassword];

var users,
  signUpValidFlag,
  usedEmailFlag,
  allInputsFlag,
  signInEmailCorrect,
  signInPasswordCorrect,
  currentUser;

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}
//////////////////////////////////////////////////////////////////
////////////////////////// Functions ///////////////////////////
function reset(e, i) {
  if (e) {
    errors.forEach(function (ele) {
      ele.classList.add("d-none");
    });
  }
  if (i) {
    inputs.forEach(function (ele) {
      ele.value = "";
    });
  }
}

function signUpEmailValid() {
  signUpValidFlag = usedEmailFlag = false;
  if (signUpName.value && signUpEmail.value && signUpPassword.value) {
    usedEmailFlag = false;
    signUpValidFlag = true;
    signUpBtn.setAttribute("data-bs-toggle", "modal");
    for (var i = 0; i < users.length; i++) {
      if (signUpEmail.value === users[i].userEmail) {
        usedEmailFlag = true;
        signUpValidFlag = false;
        signUpBtn.removeAttribute("data-bs-toggle");
      }
    }
  } else {
    allInputsFlag = true;
    signUpValidFlag = false;
    signUpBtn.removeAttribute("data-bs-toggle");
  }
}

/////////////////////////////////////////////////////////////////
//////////////////////// Event Listners ////////////////////////
signUpName.addEventListener("input", signUpEmailValid);
signUpEmail.addEventListener("input", signUpEmailValid);
signUpPassword.addEventListener("input", signUpEmailValid);

signUpBtn.addEventListener("click", function () {
  reset(true, false);
  if (signUpValidFlag) {
    users.push({
      userName: signUpName.value,
      userEmail: signUpEmail.value,
      userPassword: signUpPassword.value,
    });
    localStorage.setItem("users", JSON.stringify(users));
    usedEmailError.classList.add("d-none");
    allInputsError.classList.add("d-none");
    reset(true, true);
  } else {
    if (usedEmailFlag) {
      usedEmailError.classList.remove("d-none");
    } else {
      allInputsError.classList.remove("d-none");
    }
  }
});
