"use strict";

document.querySelector("#signup").addEventListener("submit", function (e) {
  e.preventDefault();
  const registerData = {
    fullName: document.querySelector("#fullName").value,
    username: document.querySelector("#newUsername").value,
    password: document.querySelector("#newPassword").value,
  };
  //   alert(`Account created for Email: ${newUsername}`);
  register(registerData);
});
