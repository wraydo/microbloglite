"use strict";

// Select DOM elements
const postContent = document.getElementById("postContent");
const postsContainer = document.querySelector("#postsContainer");


// Fetch posts from the API and display them
async function getPosts() {
  const loginData = getLoginData(); // Assumes getLoginData() is defined elsewhere
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  
    const response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", options);
    const data = await response.json();
    postsCardsDisplay(data);
  
}

// Create and display post cards
function postsCardsDisplay(posts) {
  postsContainer.innerHTML = ""; // Clear container before adding posts
  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.className = "card mb-3";

    postCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${post.username}</h5>
        <p class="card-text">${post.text}</p>
        <p class="card-text"><small class="text-muted">${new Date(post.createdAt).toLocaleString()}</small></p>
      </div>
    `;

    // Create Delete Button
    const deletePost = document.createElement("button");
    deletePost.className = "btn btn-danger btn-sm rounded-circle";
    deletePost.innerHTML = '<i class="bi bi-x-lg"></i>';
    deletePost.style.float = "right";

    // Add delete functionality
    deletePost.addEventListener("click", async () => {
      if (post._id) {
        const loginData = getLoginData();
        try {
          const response = await fetch(
            `http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/${post._id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${loginData.token}`,
              },
            }
          );
          if (response.ok) {
            postCard.remove(); // Remove card from UI
            console.log("Post deleted successfully");
          } else {
            throw new Error("Failed to delete post");
          }
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      }
    });

    postCard.querySelector(".card-body").appendChild(deletePost);
    postsContainer.appendChild(postCard);
  });
}

// Create a new post
async function createAPost(event) {
  event.preventDefault();
  const loginData = getLoginData(); // Assumes getLoginData() is defined elsewhere
  const newPost = {
    text: postContent.value.trim(),
  };
  if (!newPost.text) return; // Do nothing if post is empty

  try {
    const response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
      body: JSON.stringify(newPost),
    });
    if (!response.ok) throw new Error("Failed to create post");
    const data = await response.json();
    console.log("Post created successfully:", data);
    postContent.value = ""; // Clear the input
    getPosts(); // Refresh posts
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

// Initialize the page
async function initializePage() {
  await getPosts(); // Fetch and display posts
}

// Call initialization function on page load
initializePage();