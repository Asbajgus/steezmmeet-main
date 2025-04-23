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
            <button onclick="navigateTo('newEvent')">Ny Event</button>
        </div>
        <div class="card">
            <h3>Liste over events</h3>
            <ul>
                ${model.data.events.map(event => `
                    <li>${event.title}</li>
                `).join('')}
            </ul>
            <button onclick="navigateTo('event')">Se alle events</button>
        </div>
        <div class="card">
            <h3>Min statistikk</h3>
            <div class="stats">
                <div>${model.data.users[0].statistics[0].daysInSlope} Dager</div>
                <div>${model.data.users[0].statistics[0].hoursInSlope} Timer</div>
            </div>
            <button onclick="renderStatisticsPage()">Se diagram</button>
        </div>
        <div class="card">
            <h3>Mine venner</h3>
            <div class="friends">
                ${model.data.users[0].friendsID.map(friendID => {
                    const friend = model.data.users.find(user => user.id === friendID);
                    return friend ? `<button onclick="showFriendByName('${friend.name}')")">${friend.name}</button>` : '';
                }).join('')}
            </div>
            <button onclick="navigateTo('friends')">Se alle venner</button>
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