"use strict";

// Global variables
const postInput = document.querySelector("#postInput");
const postContent = document.getElementById("postContent");
const postButton = document.querySelector("#postButton");
const responseMessage = document.querySelector("#responseMessage");
const logoutBtn = document.querySelector("#logout");
const postsContainer = document.querySelector("#postsContainer");

// Logout functionality
// logoutBtn.addEventListener("click", (event) => {
//   logout(); // Assumes logout() is defined in auth.js
//   window.location.replace("index.html");
// });

// Post creation functionality
// postButton.addEventListener("click", (event) => {
//   const loginData = getLoginData();

//   const textToPost = postInput.value;

//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${loginData.token}`,
//     },
//     body: JSON.stringify({ text: textToPost }),
//   };

//   fetch(apiBaseURL + "/api/posts", options)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Post created:", data);
//       responseMessage.textContent = "Post successful!";
//       responseMessage.style.color = "green";
//       postInput.value = ""; // Clear input after successful post
//     })
//     .catch((error) => {
//       console.error("There was a problem with the fetch operation:", error);
//       responseMessage.textContent = "Failed to post. Please try again.";
//       responseMessage.style.color = "red";
//     });
// });

async function getPosts() {
  const loginData = getLoginData();
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  let promise = fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", options);
  let response = await promise;
  let data = await response.json();
  // let showCertainPost = data.slice(0,4)
  console.log(data);
  postsCardsDisplay(data);
}

function postsCardsDisplay(posts) {
  for (let i = 0; i < posts.length; i++) {
    const postCard = document.createElement("div");
    postCard.className = "card";
    postCard.innerHTML = ` 
     <div class="card-body">
     <h5 class="card-title">${posts[i].text}</h5>
     `;
    postsContainer.appendChild(postCard);
  }
}
async function initializePage() {
  let posts = await getPosts();
  //   renderPosts(posts);
}

initializePage();

// async function createPost() {
//   const loginData = getLoginData();
//   let postInfo = {
//     text: document.getElementById("postContent").value.trim(),
//   };
//   try {
//     let promise = fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${loginData.token}`,
//       },
//       body: JSON.stringify(postInfo),
//     });
//     let response = await promise;
//     let data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("Error Message", Error);
//   }
// }
async function createAPost(event) {
  const loginData = getLoginData();
  event.preventDefault();
  let newPost = {
    text: document.getElementById("postContent").value.trim(),
  };
  try {
    let promise =  await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
      body: JSON.stringify(newPost),
    });
    let response = await promise;
    let data = await response.json();
    console.log(data);
    location.reload(true)
  } catch (error) {
    console.log(error);
  }
} 