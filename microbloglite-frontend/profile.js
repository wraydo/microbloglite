"use strict"
 
  const apiUrl = "http://microbloglite.us-east-2.elasticbeanstalk.com"; // API Base URL

  // Redirect if not logged in
  document.addEventListener("DOMContentLoaded", () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (!token) {
          window.location.href = "login.html"; // Redirect to login page
      }
  });

  // Logout function
  function logout() {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "login.html"; // Redirect to login page
  }

  // Fetch and display user details
  async function fetchUserDetails() {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      try {
          const response = await fetch(`${apiUrl}/me`, {
              headers: { "Authorization": `Bearer ${token}` }
          });

          if (!response.ok) throw new Error("Failed to fetch user details.");

          const user = await response.json();
          document.querySelector(".profile-bio h4").textContent = user.username || "Unknown User";

      } catch (error) {
          console.error("Error fetching user details:", error);
      }
  }

  // Add event listener to initialize user data
  document.addEventListener("DOMContentLoaded", fetchUserDetails);



  const loginData = getLoginData();
  try {
    let promise = fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/users?limit=100&offset=0=${loginData.username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
    });
    let response = await promise;
    let data = await response.json();
    console.log(data);
    createPostCards(data);
  } catch (error) {
    console.error(error);
  }
}
getAllUserPosts(); 

