function navigateTo(page) {
    // Hide all sections
    model.app.pages.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            element.style.display = 'none';
        }
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
            document.getElementById('statisticsFullPage').style.display = 'none';
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
            showAllEvents(); // Render events dynamically
            break;
        case 'friends':
            document.getElementById('friendContainer').style.display = 'block';
            showAllFriends(); // Render friends dynamically
            break;
        case 'admin':
            document.getElementById('adminContainer').style.display = 'block';
            renderAdminPage(); // Render admin panel dynamically
            break;
        case 'admin':
            document.getElementById('adminContainer').style.display = 'block';
            showAllUsers();
            break;
        default:
            console.error(`Unknown page: ${page}`);
    }
}

function backToDashboard() {
    navigateTo('dashboard');
}