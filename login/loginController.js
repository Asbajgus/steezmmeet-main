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

    // Check if the user already exists in the model
    let user = model.data.users.find(u => u.username === username);

    if (!user) {
        // Create a new user if it doesn't exist
        user = {
            id: model.data.users.length + 1, // Generate a new ID
            username: username,
            name: username, // Default name is the username
            aboutMe: "New user",
            favoriteSlopeID: [],
            favoriteLocationID: [],
            status: true, // Mark the user as logged in
            chat: [],
            friendsID: [],
            statistics: [
                {
                    daysInSlope: 0,
                    hoursInSlope: 0,
                },
            ],
        };
        model.data.users.push(user); // Add the new user to the model
    } else {
        // Mark the existing user as logged in
        user.status = true;
    }

    // Update the personalized welcome message in the dashboard
    document.getElementById('contentContainer').innerHTML = `
        <h1>Welcome, ${user.name}!</h1>
        <p>This is your dashboard. Enjoy your stay!</p>
        <div id="dashboardContent" class="dashboard"></div>
    `;

    // Hide the login form and show the dashboard
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('welcomeContainer').style.display = 'none';
    document.getElementById('contentContainer').style.display = 'block';

    // Update the "Log In" button to "Log Out"
    document.getElementById('authButton').innerText = 'Log Out';
    document.getElementById('authButtonMobile').innerText = 'Log Out';

    renderDashboard(); // Render dashboard dynamically
};