/* Landing Page JavaScript */

"use strict";

// const loginForm = document.querySelector("#login");

// loginForm.onsubmit = function (event) {
//     // Prevent the form from refreshing the page,
//     // as it will do by default when the Submit event is triggered:
//     event.preventDefault();

//     // We can use loginForm.username (for example) to access
//     // the input element in the form which has the ID of "username".
//     const loginData = {
//         username: loginForm.username.value,
//         password: loginForm.password.value,
//     }

//     // Disables the button after the form has been submitted already:
//     loginForm.loginButton.disabled = true;

//     // Time to actually process the login using the function from auth.js!
//     login(loginData);
// };

document.querySelector("#login").addEventListener("submit", function (e) {
  e.preventDefault();
  // alert(`Logged in with Username: ${username}`);
  const loginData = {
    username: document.querySelector("#username").value,
    password: document.querySelector("#password").value,
  };
  login(loginData);
});

document.querySelector("#signup").addEventListener("submit", function (e) {
  e.preventDefault();
  const newUsername = document.querySelector("#newUsername").value;
  const newPassword = document.querySelector("#newPassword").value;
  alert(`Account created for Email: ${newUsername}`);
});
login(loginData);
