


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
            showAllEvents(); // Render event dynamically
            break;
        case 'newEvent':
            document.getElementById('eventContainer').style.display = 'block';
            createNewEvent(); // Render event dynamically
            break;
        case 'friends':
            document.getElementById('friendContainer').style.display = 'block';
            showAllFriends();
            break;
        default:
            console.error(`Unknown page: ${page}`);
    }
}