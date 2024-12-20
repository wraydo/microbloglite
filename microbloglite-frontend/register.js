"use strict";

async function createUser() {
  let signUp = {
    username: document.querySelector("#username").value,
    fullName: document.querySelector("#fullName").value,
    email: document.querySelector("#email").value,
    password: document.querySelector("#newPassword").value,
  };

  try {
    let promise = fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUp),
    });
    let response = await promise;
    if (response.ok) {
      console.log("Great Job, Bro");
    }
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error message bozo:", error.message);
  }
  location.href = "index.html";
}
