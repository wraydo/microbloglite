/* Posts Page JavaScript */

"use strict";
const postButton = document.querySelector("#postButton");
const postContent = document.querySelector("#postContent");
const postsContainer = document.querySelector("#postsContainer");
const tweetsCount = document.querySelector("#tweetsCount");
const uploadPic = document.querySelector("#upload-pic");
const profilePic = document.querySelector("#profile-pic");

let posts = JSON.parse(localStorage.getItem("posts")) || [];

// Save posts to localStorage
function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Render posts
function renderPosts() {
    postsContainer.innerHTML = "";
    posts.forEach((post, index) => {
        console.log(post)
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <p>${post.username}</p>
            <p>${post.content}</p>
            <p class="text-muted" style="font-size: 12px;">${post.date}</p>
            <span class="delete-btn" data-index="${index}">&times;</span>
        `;
        postsContainer.appendChild(postElement);
    });
    tweetsCount.textContent = posts.length;
}

// Add new post
postButton.addEventListener("click", () => {
    const content = postContent.value.trim();
    if (content === "") return alert("Please write something!");
    const newPost = { content, date: new Date().toLocaleString() };
    posts.unshift(newPost);
    savePosts();
    renderPosts();
    postContent.value = "";
});

// Delete post
// postsContainer.addEventListener("click", (e) => {
//     if (e.target.classList.contains("delete-btn")) {
//         const index = e.target.dataset.index;
//         posts.splice(index, 1);
//         savePosts();
//         renderPosts();
//     }
// });

// // Profile picture upload
// uploadPic.addEventListener("change", (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//         profilePic.src = reader.result;
//         localStorage.setItem("profilePic", reader.result);
//     };
//     if (file) reader.readAsDataURL(file);
// });

// // Load profile picture
// const savedPic = localStorage.getItem("profilePic");
// if (savedPic) profilePic.src = savedPic;

// // Initial render
renderPosts();