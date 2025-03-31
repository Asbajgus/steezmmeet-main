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

const galleriModel = [
    {
        title: "Triks jeg prøver meg på",
        type: "video",
        src: "videos/sample1.mp4",
    },
    {
        title: "Triks jeg skal prøve meg på",
        type: "image",
        src: "img/sample2.jpg",
    },
    {
        title: "Bilde 1",
        type: "image",
        src: "img/sample3.jpg",
    }
];

function renderGalleri() {
    const galleriContent = document.getElementById("galleriContent");
    galleriContent.innerHTML = ""; // Clear existing content

    galleriModel.forEach(item => {
        const card = document.createElement("div");
        card.className = "galleri-card";

        const title = document.createElement("h3");
        title.innerText = item.title;

        const img = document.createElement("img");
        img.src = item.type === "image" ? item.src : "img/video-placeholder.jpg";
        img.alt = item.title;

        const viewButton = document.createElement("button");
        viewButton.innerText = "View";
        viewButton.onclick = () => viewGalleriItem(item); // Correctly bind the item

        card.appendChild(title);
        card.appendChild(img);
        card.appendChild(viewButton);

        galleriContent.appendChild(card);
    });
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