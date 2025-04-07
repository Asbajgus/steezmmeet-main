// document.getElementById('loginForm').onsubmit = function (event) {
//     event.preventDefault(); // Prevent form submission

//     const username = document.getElementById('username').value;

//     // Check if the user already exists in the model
//     let user = model.data.users.find(u => u.username === username);

//     if (!user) {
//         // Create a new user if it doesn't exist
//         user = {
//             id: model.data.users.length + 1, // Generate a new ID
//             username: username,
//             name: username, // Default name is the username
//             aboutMe: "New user",
//             favoriteSlopeID: [],
//             favoriteLocationID: [],
//             status: true, // Mark the user as logged in
//             chat: [],
//             friendsID: [],
//             statistics: [
//                 {
//                     daysInSlope: 0,
//                     hoursInSlope: 0,
//                 },
//             ],
//         };
//         model.data.users.push(user); // Add the new user to the model
//     } else {
//         // Mark the existing user as logged in
//         user.status = true;
//     }

//     // Update the personalized welcome message in the dashboard
//     document.getElementById('contentContainer').innerHTML = `
//         <h1>Welcome, ${user.name}!</h1>
//         <p>This is your dashboard. Enjoy your stay!</p>
//         <div id="dashboardContent" class="dashboard"></div>
//     `;

//     // Hide the login form and show the dashboard
//     document.getElementById('loginContainer').style.display = 'none';
//     document.getElementById('welcomeContainer').style.display = 'none';
//     document.getElementById('contentContainer').style.display = 'block';

//     // Update the "Log In" button to "Log Out"
//     document.getElementById('authButton').innerText = 'Log Out';
//     document.getElementById('authButtonMobile').innerText = 'Log Out';

//     renderDashboard(); // Render dashboard dynamically
// };

function renderDashboard() {
    const dashboardContent = document.getElementById('dashboardContent');
    if (!dashboardContent) {
        console.error("Dashboard container not found.");
        return;
    }

    dashboardContent.innerHTML = `
        <div class="card">
            <h3>Mine events</h3>
            <ul>
                ${model.data.events.map(event => `
                    <li>${event.title} - ${event.date} (${event.place[0]})</li>
                `).join('')}
            </ul>
            <button>Ny Event</button>
        </div>
        <div class="card">
            <h3>Liste over events</h3>
            <ul>
                ${model.data.events.map(event => `
                    <li>${event.title}</li>
                `).join('')}
            </ul>
            <button>Se alle events</button>
        </div>
        <div class="card">
            <h3>Min statistikk</h3>
            <div class="stats">
                <div>${model.data.users[0].statistics[0].daysInSlope} D</div>
                <div>${model.data.users[0].statistics[0].hoursInSlope} T</div>
            </div>
            <button>Se diagram</button>
        </div>
        <div class="card">
            <h3>Mine venner</h3>
            <div class="friends">
                ${model.data.users[0].friendsID.map(friendID => {
                    const friend = model.data.users.find(user => user.id === friendID);
                    return friend ? `<button>${friend.name}</button>` : '';
                }).join('')}
            </div>
            <button>Se alle venner</button>
        </div>
    `;
}

function renderGalleri() {
    const galleriContent = document.getElementById("galleriContent");
    galleriContent.innerHTML = model.data.gallery.map(item => `
        <div class="galleri-card">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <img src="${item.src}" alt="${item.title}">
            <button onclick="viewGalleriItem(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                ${item.type === 'image' ? 'View Image' : 'Play Video'}
            </button>
        </div>
    `).join('');
}

function renderChat() {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = model.data.users[0].chat[0].conversation.map(msg => `
        <div class="chat-message ${msg.userID === model.data.users[0].id ? 'user' : 'bot'}">
            ${msg.message}
        </div>
    `).join('');
}

function deleteGalleriItem(index) {
    model.data.gallery.splice(index, 1); // Remove the item from the model
    renderGalleri(); // Re-render the gallery
}

function addGalleriItem(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : null;
    if (!fileType) {
        alert("Only images and videos are allowed.");
        return;
    }
    const title = prompt("Enter a title for the item:");
    if (!title) {
        alert("Title is required.");
        return;
    }
    const description = prompt("Enter a description for the item (optional):");
    const reader = new FileReader();
    reader.onload = function (e) {
        const newItem = {
            title: title,
            type: fileType,
            src: e.target.result,
            description: description || "",
        };
        model.data.gallery.push(newItem); // Add the new item to the model
        renderGalleri(); // Re-render the gallery
    };
    reader.readAsDataURL(file); // Read the file as a data URL
}

function navigateTo(page) {
    // Hide all sections
    model.app.pages.forEach(section => {
        document.getElementById(section).style.display = 'none';
    });

    // Show the appropriate section
    switch (page) {
        case 'welcome':
            document.getElementById('welcomeContainer').style.display = 'block';
            break;
        case 'login':
            document.getElementById('loginContainer').style.display = 'block';
            break;
        case 'dashboard':
            document.getElementById('contentContainer').style.display = 'block';
            renderDashboard(); // Render dashboard dynamically
            break;
        case 'galleri':
            document.getElementById('galleriContainer').style.display = 'block';
            renderGalleri(); // Render gallery dynamically
            break;
        case 'chat':
            document.getElementById('chatContainer').style.display = 'block';
            renderChat(); // Render chat dynamically
            break;
        default:
            console.error(`Unknown page: ${page}`);
    }
}