"use strict";
//////////////////// Dom Elements Declarations ///////////////////
var homeSection = document.querySelector("#welcome");
var homeH1 = document.querySelector("#welcome h1");
var logoutBtn = document.querySelector("#welcome button");

///////////////////////////////////////////////////////////////////
//////////////////////////// Logic /////////////////////////////
homeH1.innerHTML = `Welcome, ${localStorage.getItem("currentUser")}!`;

logoutBtn.addEventListener("click", function () {
  switchToSignIn();
});
