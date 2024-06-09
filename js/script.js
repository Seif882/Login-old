"use strict";
//////////////////// Dom Elements Declarations ///////////////////
//////////////////////// Sign Up Section ////////////////////////
var signUpSection = document.querySelector("#signup");
var signUpName = document.querySelector("#signup-name");
var signUpEmail = document.querySelector("#signup-email");
var signUpPassword = document.querySelector("#signup-password");
var allInputsError = document.querySelector("#all-inputs");
var usedEmailError = document.querySelector("#used-email");
var signUpBtn = document.querySelector("#signup-btn");
var signInSwitch = document.querySelector("#signup span");
var modalBtn = document.querySelector("#modal-btn");

//////////////////////// Sign In Section ////////////////////////
var signInSection = document.querySelector("#signin");
var signInEmail = document.querySelector("#signin-email");
var signInPassword = document.querySelector("#signin-password");
var signInBtn = document.querySelector("#signin-btn");
var signUpSwitch = document.querySelector("#signin span");
var signInEmailError = document.querySelector("#invalid-email");
var signInPasswordError = document.querySelector("#invalid-password");

//////////////////////// Home Section ////////////////////////
var homeSection = document.querySelector("#welcome");
var homeH1 = document.querySelector("#welcome h1");
var logoutBtn = document.querySelector("#welcome button");
///////////////////////////////////////////////////////////////////
//////////////////////// Global Variables ////////////////////////
var errors = [
  allInputsError,
  usedEmailError,
  signInEmailError,
  signInPasswordError,
];

var inputs = [
  signUpName,
  signUpEmail,
  signUpPassword,
  signInEmail,
  signInPassword,
];

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
////////////////////// Global Functions ///////////////////////
function reset() {
  errors.forEach(function (ele) {
    ele.classList.add("d-none");
  });
  inputs.forEach(function (ele) {
    ele.value = "";
  });
}

/////////////////// Sign Up Functions ////////////////////
function signUpEmailValid() {
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

function switchToSignIn() {
  signUpSection.classList.add("d-none");
  signInSection.classList.remove("d-none");
  homeSection.classList.add("d-none");
  reset();
}

//////////////////////// Sign In Functions ////////////////////////
function signInValid() {
  signInEmailCorrect = signInPasswordCorrect = false;
  for (var i = 0; i < users.length; i++) {
    if (signInEmail.value === users[i].userEmail) {
      signInEmailCorrect = true;
      if (signInPassword.value === users[i].userPassword) {
        signInPasswordCorrect = true;
        currentUser = users[i].userName;
        break;
      }
    }
  }
}

function loggedIn() {
  homeSection.classList.remove("d-none");
  signUpSection.classList.add("d-none");
  signInSection.classList.add("d-none");
  homeH1.innerHTML = `Welcome, ${currentUser}!`;
  reset();
}

function switchToSignUp() {
  signUpSection.classList.remove("d-none");
  signInSection.classList.add("d-none");
  homeSection.classList.add("d-none");
  reset();
}

/////////////////////////////////////////////////////////////////
//////////////////////// Event Listners ////////////////////////
//////////////////// Sign Up Event Listners ///////////////////
signUpBtn.addEventListener("mouseenter", signUpEmailValid);

signUpBtn.addEventListener("click", function () {
  if (signUpValidFlag) {
    users.push({
      userName: signUpName.value,
      userEmail: signUpEmail.value,
      userPassword: signUpPassword.value,
    });
    localStorage.setItem("users", JSON.stringify(users));
    usedEmailError.classList.add("d-none");
    allInputsError.classList.add("d-none");
    reset();
  } else {
    if (usedEmailFlag) {
      usedEmailError.classList.remove("d-none");
    } else {
      allInputsError.classList.remove("d-none");
    }
  }
});

signInSwitch.addEventListener("click", switchToSignIn);

modalBtn.addEventListener("click", switchToSignIn);

//////////////////// Sign In Event Listners ///////////////////
signInBtn.addEventListener("mouseenter", signInValid);

signInBtn.addEventListener("click", function () {
  if (!signInEmailCorrect) {
    signInEmailError.classList.remove("d-none");
    signInPasswordError.classList.add("d-none");
  } else if (!signInPasswordCorrect) {
    signInEmailError.classList.add("d-none");
    signInPasswordError.classList.remove("d-none");
  } else {
    loggedIn();
    reset();
  }
});

signUpSwitch.addEventListener("click", switchToSignUp);

//////////////////// Home Event Listners ///////////////////

logoutBtn.addEventListener("click", function () {
  switchToSignIn();
});
