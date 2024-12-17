/* Landing Page JavaScript */

"use strict";


document.querySelector("#login").addEventListener("submit", function (e) {
  e.preventDefault();
  // alert(`Logged in with Username: ${username}`);
  const loginData = {
    username: document.querySelector("#username").value,
    password: document.querySelector("#password").value,
  };
  login(loginData);
});


