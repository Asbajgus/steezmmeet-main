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
                    <li>${event.title} - ${event.date} (${event.place[0]}${event.weather ? ' - ' + event.weather : ''})</li>
                `).join('')}
            </ul>
            <button onclick="navigateTo('newEvent')">Ny Event</button>
        </div>
        <div class="card">
            <h3>List of events</h3>
            <ul>
                ${model.data.events.map(event => `
                    <li>${event.title}</li>
                `).join('')}
            </ul>
            <button onclick="navigateTo('event')">See events</button>
        </div>
        <div class="card">
            <h3>Statistics</h3>
            <div class="stats">
                <div>${model.data.users[0].statistics[0].daysInSlope} Dager</div>
                <div>${model.data.users[0].statistics[0].hoursInSlope} Timer</div>
            </div>
            <button onclick="renderStatisticsPage()">Diagram</button>
        </div>
        <div class="card">
            <h3>My friends</h3>
            <div class="friends">
                ${model.data.users[0].friendsID.map(friendID => {
                    const friend = model.data.users.find(user => user.id === friendID);
                    return friend ? `<button onclick="showFriendByName('${friend.name}')")">${friend.name}</button>` : '';
                }).join('')}
            </div>
            <button onclick="navigateTo('friends')">See all friends</button>
        </div>
    `;
}

function renderGallery() {
    const galleryContent = document.getElementById("galleryContent");
    galleryContent.innerHTML = model.data.gallery.map(item => `
        <div class="gallery-card">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <img src="${item.src}" alt="${item.title}">
            <button onclick="viewGalleryItem(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                ${item.type === 'image' ? 'View Image' : 'Play Video'}
            </button>
        </div>
    `).join('');
}