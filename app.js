document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;

    // Update the personalized welcome message in the dashboard
    const dashboardHeader = document.querySelector('#contentContainer h1');
    dashboardHeader.innerText = `Welcome, ${username}!`;

    // Hide the login form and show the dashboard
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('welcomeContainer').style.display = 'none';
    document.getElementById('contentContainer').style.display = 'block';

    // Update the "Log In" button to "Log Out"
    document.getElementById('authButton').innerText = 'Log Out';
    document.getElementById('authButtonMobile').innerText = 'Log Out';
});


function renderGalleri() {
    const galleriContent = document.getElementById("galleriContent");
    galleriContent.innerHTML = ""; // Clear existing content

    model.data.gallery.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "galleri-card";

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "X"; // Ensure the button has the correct text
        deleteButton.className = "delete-button"; // Ensure the button has the correct class
        deleteButton.onclick = () => deleteGalleriItem(index); // Pass the index to delete the item

        const title = document.createElement("h3");
        title.innerText = item.title;

        const img = document.createElement("img");
        img.src = item.type === "image" ? item.src : "img/video-placeholder.jpg";
        img.alt = item.title;

        const viewButton = document.createElement("button");
        viewButton.innerText = item.type === "image" ? "View Image" : "Play Video";
        viewButton.onclick = () => viewGalleriItem(item);

        card.appendChild(deleteButton);
        card.appendChild(title);
        card.appendChild(img);
        card.appendChild(viewButton);

        galleriContent.appendChild(card);
    });
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