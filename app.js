document.getElementById('loginForm').onsubmit = function (event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;

    // Update the personalized welcome message in the dashboard
    document.getElementById('contentContainer').innerHTML = `
        <h1>Welcome, ${username}!</h1>
        <p>This is your dashboard. Enjoy your stay!</p>
        <div class="dashboard">
            <div class="card">
                <h3>Mine events</h3>
                <p>Hafjell meet</p>
                <button>Ny Event</button>
            </div>
            <div class="card">
                <h3>Liste over events</h3>
                <p>Hafjell meet</p>
                <button>Se alle events</button>
            </div>
            <div class="card">
                <h3>Min statistikk</h3>
                <div class="stats">
                    <div>25 D</div>
                    <div>92 T</div>
                </div>
                <button>Se diagram</button>
            </div>
            <div class="card">
                <h3>Mine venner</h3>
                <div class="friends">
                    <button>Pål</button>
                    <button>Stig</button>
                </div>
                <button>Se alle venner</button>
            </div>
        </div>
    `;

    // Hide the login form and show the dashboard
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('welcomeContainer').style.display = 'none';
    document.getElementById('contentContainer').style.display = 'block';

    // Update the "Log In" button to "Log Out"
    document.getElementById('authButton').innerText = 'Log Out';
    document.getElementById('authButtonMobile').innerText = 'Log Out';
};

function renderGalleri() {
    const galleriContent = document.getElementById("galleriContent");
    galleriContent.innerHTML = ""; // Clear existing content

    let galleriHTML = "";
    model.data.gallery.forEach((item, index) => {
        galleriHTML += `
            <div class="galleri-card">
                <button class="delete-button" onclick="deleteGalleriItem(${index})">X</button>
                <h3>${item.title}</h3>
                <img src="${item.type === "image" ? item.src : "img/video-placeholder.jpg"}" alt="${item.title}">
                <button onclick="viewGalleriItem(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                    ${item.type === "image" ? "View Image" : "Play Video"}
                </button>
            </div>
        `;
    });
    galleriContent.innerHTML = galleriHTML;
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

    const reader = new FileReader();
    reader.onload = function (e) {
        const newItem = {
            title: file.name,
            type: fileType,
            src: e.target.result,
        };
        model.data.gallery.push(newItem); // Add the new item to the model
        renderGalleri(); // Re-render the gallery
    };
    reader.readAsDataURL(file); // Read the file as a data URL
}

function navigateToDashboard() {
    document.getElementById('galleriContainer').style.display = 'none';
    document.getElementById('galleriItemContainer').style.display = 'none';
    document.getElementById('chatContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('welcomeContainer').style.display = 'none';
    document.getElementById('contentContainer').style.display = 'block';
}

function navigateToGalleri() {
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('galleriItemContainer').style.display = 'none';
    document.getElementById('chatContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('welcomeContainer').style.display = 'none';
    document.getElementById('galleriContainer').style.display = 'block';

    renderGalleri(); // Render gallery items dynamically
}

function navigateToChat() {
    document.getElementById('contentContainer').style.display = 'none';
    document.getElementById('galleriContainer').style.display = 'none';
    document.getElementById('galleriItemContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('welcomeContainer').style.display = 'none';
    document.getElementById('chatContainer').style.display = 'block';
}

function backToDashboard() {
    document.getElementById('galleriContainer').style.display = 'none';
    document.getElementById('galleriItemContainer').style.display = 'none';
    document.getElementById('chatContainer').style.display = 'none';
    document.getElementById('contentContainer').style.display = 'block';
}