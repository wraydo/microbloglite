"use strict";

// document.querySelector("#signup").addEventListener("submit", async function (e) {
//   e.preventDefault();
//   // const registerData = {
//   //   fullName: document.querySelector("#fullName").value,
//   //   username: document.querySelector("#newUsername").value,
//   //   password: document.querySelector("#newPassword").value,
//   // };
//   //   alert(`Account created for Email: ${newUsername}`);

//   // const username = document.querySelector("#username").value;
//   // const fullName = document.querySelector("#fullName").value;
//   // const newPassword = document.querySelector("#newPassword").value;
//   // const reenterPassword = document.querySelector("#reenterPassword").value;
//   // register(registerData);
//   // //   console.log(registerData);

//   // if (newPassword !== reenterPassword) {
//   //   alert("Passwords do not match!");
//   //   return;
//   // }
//   // try {
//   //   const response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify({
//   //       username,
//   //       fullName,
//   //       password,
//   //     }),
//   //   });
//   //   if (!response.ok) {
//   //     throw new Error("Registration failed");
//   //   }
//   //   alert("Registration successful! Please login.");
//   //   window.location.assign("/index.html");
//   // } catch (error) {
//   //   alert("Failed to register. Please try again.");
//   //   console.error("Registration error:", error);
//   // }
// });

//Tim's Version
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
    if(response.ok){
      console.log("Great Job, Bro")
      
    }
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error message bozo:", error.message);
  }
  location.href = "index.html"
}
