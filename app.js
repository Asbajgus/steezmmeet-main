
function renderChat() {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = model.data.users[0].chat[0].conversation.map(msg => `
        <div class="chat-message ${msg.userID === model.data.users[0].id ? 'user' : 'bot'}">
            ${msg.message}
        </div>
    `).join('');
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
        case 'event':
            document.getElementById('eventContainer').style.display = 'block';
            showAllEvents(); // Render chat dynamically
            break;

        default:
            console.error(`Unknown page: ${page}`);
    }
}