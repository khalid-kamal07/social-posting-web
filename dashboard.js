// Retrieve logged-in user data from localStorage
const loggedInUser = JSON.parse(localStorage.getItem('loggedinUser')) || null;

// Display user data if logged in
if (loggedInUser) {
    document.getElementById("userName").textContent = loggedInUser.username;
    document.getElementById("profilePic").src = loggedInUser.profilePic || "https://patel-hospital.org.pk/public/uploads/doctors/thumb_man-dummy_20240222071320.jpg";
} else {
    alert("Please log in to continue!");
    window.location = "login.html"; // Redirect to login if no user data found
}

// Open the Edit Profile Modal
function openEditProfileModal() {
    const modal = document.getElementById("editProfileModal");
    modal.style.display = "block"; // Display the modal
}

// Close the Edit Profile Modal
function closeEditProfileModal() {
    const modal = document.getElementById("editProfileModal");
    modal.style.display = "none"; // Hide the modal
}

// Function to handle the profile picture update (either by URL or file upload)
function saveProfile() {
    const newProfilePicURL = document.getElementById("newProfilePicURL").value;
    const fileInput = document.getElementById("uploadProfilePic");
    let newProfilePic = null;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            newProfilePic = e.target.result;
            updateProfilePic(newProfilePic);
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
    else if (newProfilePicURL) {
        newProfilePic = newProfilePicURL;
        updateProfilePic(newProfilePic);
    }
    closeEditProfileModal();
}

function updateProfilePic(newProfilePic) {
    if (newProfilePic) {
        loggedInUser.profilePic = newProfilePic;
        localStorage.setItem('loggedinUser', JSON.stringify(loggedInUser)); 
        document.getElementById("profilePic").src = newProfilePic; 
    }
}

// Create a new post
function createPost() {
    const postContent = document.getElementById("postInput").value;
    const postImageURL = document.getElementById("imageURLInput").value;

    if (postContent.trim() === "") {
        alert("Please write something before posting!");
        return;
    }

    const newPost = {
        id: Date.now(), // Unique ID based on time
        userName: loggedInUser.username,
        userProfilePic: loggedInUser.profilePic || "https://patel-hospital.org.pk/public/uploads/doctors/thumb_man-dummy_20240222071320.jpg",
        content: postContent,
        imageUrl: postImageURL || null, // Handle image URL
        likes: 0,
        createdAt: new Date(),
    };

    posts.unshift(newPost); // Add post to the top of the feed

    // Save posts to localStorage
    localStorage.setItem('posts', JSON.stringify(posts));

    // Clear the input fields after posting
    document.getElementById("postInput").value = "";
    document.getElementById("imageURLInput").value = "";

    // Re-render the posts feed
    renderPosts();
}

// Render all posts in the feed
function renderPosts() {
    const feed = document.getElementById("feed");
    feed.innerHTML = ""; // Clear the current feed

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.userProfilePic}" alt="Profile Picture">
                <h3 id='    '>${post.userName}</h3>
                <span id='postdate'>${new Date(post.createdAt).toLocaleString()}</span>
                <span class="three-dots-menu" onclick="togglePostOptions(${post.id})">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </span>
            </div>
            <p class="post-content">${post.content}</p>
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post Image" class="post-image">` : ""}
            <div class="post-actions">
                <button class="like-btn" onclick="toggleLike(${post.id})"> 
                    <i class="fa-solid fa-thumbs-up"></i> ${post.likes}
                </button>
            </div>
            <div id="post-options-${post.id}" class="post-options">
                ${post.userName === loggedInUser.username ? 
                    `<button onclick="editPost(${post.id})">Edit Post</button> <hr>
                    <button onclick="deletePost(${post.id})">Delete Post</button>` : 
                    `<button disabled>Edit Post</button> <hr>
                    <button disabled>Delete Post</button>`
                }
            </div>
        `;
        feed.appendChild(postElement);
    });
}

// Show or hide post options (Edit/Delete)
function togglePostOptions(postId) {
    const postOptions = document.getElementById(`post-options-${postId}`);
    postOptions.style.display = postOptions.style.display === 'block' ? 'none' : 'block';
    postOptions.addEventListener('mouseleave', function(){
        postOptions.style.display = 'none'
        
    })
}

// Edit a post
function editPost(postId) {
    const post = posts.find(p => p.id === postId);
    const newContent = prompt("Edit your post:", post.content);
    if (newContent !== null) {
        post.content = newContent;
        localStorage.setItem('posts', JSON.stringify(posts)); // Save updated posts
        renderPosts(); // Re-render posts
    }
}

// Delete a post
function deletePost(postId) {
    posts = posts.filter(post => post.id !== postId); // Remove post
    localStorage.setItem('posts', JSON.stringify(posts)); // Save updated posts
    renderPosts(); // Re-render posts
}

// Toggle like/unlike functionality
function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    post.likes = post.likes === 0 ? 1 : 0; // Toggle like
    localStorage.setItem('posts', JSON.stringify(posts)); // Save updated posts
    renderPosts(); // Re-render posts to update the like counter
}

// Logout Function
function logout() {
    localStorage.removeItem('loggedinUser'); // Remove user data from localStorage
    window.location = 'login.html'; // Redirect to login page
}

let posts = JSON.parse(localStorage.getItem('posts')) || [];

renderPosts();
