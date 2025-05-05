function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

function showLoginForm() {
    document.getElementById('welcomeContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
}

function handleAuth() {
    const isLoggedIn = document.getElementById('authButton').innerText === 'Log Out';
    if (isLoggedIn) {
        // Log out logic
        document.getElementById('contentContainer').style.display = 'none';
        document.getElementById('welcomeContainer').style.display = 'block';
        document.getElementById('authButton').innerText = 'Log In';
        document.getElementById('authButtonMobile').innerText = 'Log In';
    } else {
        // Show login form
        showLoginForm();
    }
}

document.getElementById('loginForm').onsubmit = function (event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;

    // Display a personalized welcome message
    document.getElementById('contentContainer').innerHTML = `
        <h1 class="dashboard-title">Welcome, ${username}!</h1>
        <p class="dashboard-message">This is your dashboard. Enjoy your stay!</p>
    `;

    // Hide the login form and show the dashboard
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('contentContainer').style.display = 'block';

    // Update the "Log In" button to "Log Out"
    document.getElementById('authButton').innerText = 'Log Out';
    document.getElementById('authButtonMobile').innerText = 'Log Out';
};

function viewGalleryItem(item) {
    selectedGalleryItem = item;
    const content = document.getElementById("galleryItemContent");

    if (item.type === "image") {
        content.innerHTML = `
            <h2>${item.title}</h2>
            <img src="${item.src}" alt="${item.title}" style="max-width: 100%;">
        `;
    } else if (item.type === "video") {
        content.innerHTML = `
            <h2>${item.title}</h2>
            <video src="${item.src}" controls style="max-width: 100%;"></video>
        `;
    }

    document.getElementById("galleryContainer").style.display = "none";
    document.getElementById("galleryItemContainer").style.display = "block";
}