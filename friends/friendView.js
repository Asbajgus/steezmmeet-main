// const friendArray = model.data.friends;
// const usersArray = model.data.users;

const friendArray = model.data.users;

const locationsArray = model.data.locations;
const container = document.getElementById('friendContainer');
let searchResultsContainer;

// --- Add the truncateText function here ---
const textLimitBio = 20; // You can adjust the character limit for the bio
function truncateText(text, textLimit) {
    return text.length > textLimit ? text.substring(0, textLimit) + "..." : text;
}
// --- End of added function ---

const realStatus = user => user.status ? "online" : "offline";

function getLocationName(locationId) {
    const location = locationsArray.find(loc => loc.id === locationId[0]);
    return location ? location.location : 'N/A';
}

function getSlopeDetails(locationId, slopeId) {
    const location = locationsArray.find(loc => loc.id === locationId[0]);
    if (location && location.slopes) {
        const slope = location.slopes.find(s => s.id === slopeId[0]);
        return slope ? `${slope.name} (${slope.difficulty})` : 'N/A';
    }
    return 'N/A';
}

function showAllFriends() {
    container.innerHTML = /*HTML*/ `
        <h1>Friends</h1>
        <table id="friendTable">
            <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Bio</th>
                <th>Favourite slope</th>
                <th>Favourite location</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </table>
        <br>
        <button onclick="addNewFriendView()">Add New Friend</button>
        <button onclick="navigateTo('dashboard')">Dashboard</button>
        `;

    const table = document.getElementById('friendTable');
    friendArray.forEach((f, i) => {
        // --- Use truncateText to limit the bio's length ---
        const truncatedBio = truncateText(f.aboutMe, textLimitBio);
        table.innerHTML += /*HTML*/ `
            <tr>
                <td>${f.name}</td>
                <td>${f.username}</td>
                <td>${truncatedBio}</td>
                <td>${getSlopeDetails(f.favoriteLocationID, f.favoriteSlopeID)}</td>
                <td>${getLocationName(f.favoriteLocationID)}</td>
                <td>${realStatus(f)}</td>
                <td>
                    <button onclick="showFriend(${i})">Show</button>
                </td>
            </tr>
        `;
    });
    
}

function showFriend(index) {
    const f = friendArray[index];
    document.getElementById('friendContainer').innerHTML = /*HTML*/ `
        <h1>${f.name}</h1>
        <p><strong>Name:</strong> ${f.name}</p>
        <p><strong>Username:</strong> ${f.username}</p>
        <p><strong>About Me:</strong> ${f.aboutMe}</p>
        <p><strong>Favourite Slope:</strong> ${getSlopeDetails(f.favoriteLocationID, f.favoriteSlopeID)}</p>
        <p><strong>Favourite Location:</strong> ${getLocationName(f.favoriteLocationID)}</p>
        <p><strong>Status:</strong> ${realStatus(f)}</p>
        <br>
        <button onclick="editFriend(${index})">Edit</button>
        <button onclick="showAllFriends()">Back</button>
    `;
}

function showFriendByName(name) {
    const f = friendArray.find(friend => friend.name === name);
    const index = friendArray.indexOf(f);
    navigateTo('friends');
    document.getElementById('friendContainer').innerHTML = /*HTML*/ `
        <h1>${f.name}</h1>
        <p><strong>Name:</strong> ${f.name}</p>
        <p><strong>Username:</strong> ${f.username}</p>
        <p><strong>About Me:</strong> ${f.aboutMe}</p>
        <p><strong>Favourite Slope:</strong> ${getSlopeDetails(f.favoriteLocationID, f.favoriteSlopeID)}</p>
        <p><strong>Favourite Location:</strong> ${getLocationName(f.favoriteLocationID)}</p>
        <p><strong>Status:</strong> ${realStatus(f)}</p>
        <br>
        <button onclick="editFriend(${index})">Edit</button>
        <button onclick="showAllFriends()">Back</button> <br>
        `;

}

function editFriend(index) {
    const f = friendArray[index];
    document.getElementById('friendContainer').innerHTML = /*HTML*/ `
        <h2>Edit Friend</h2>
        <p><strong>Name:</strong><br>
            <textarea id="editName" rows="1" cols="40">${f.name}</textarea>
        </p>
        <br>
        <button onclick="deleteFriendConfirmation(${index})">Delete</button>
        <button onclick="updateFriend(${index})">Save</button>
        <button onclick="showFriend(${index})">Cancel</button>
    `;
}

function deleteFriendConfirmation(index) {
    const friendToDelete = friendArray[index];
    document.getElementById('friendContainer').innerHTML = /*HTML*/ `
    <h2>Confirm Delete</h2>
    <p>Are you sure you want to delete your friend "${friendToDelete.name}"?</p>
    <button onclick="deleteFriend(${index})">Delete</button>
    <button onclick="showAllFriends()">Cancel</button>
    `;
}

function deleteFriend(index) {
    friendArray.splice(index, 1);
    showAllFriends();
}

function updateFriend(index) {
    const newName = document.getElementById('editName').value;
    friendArray[index].name = newName;
    showFriend(index);
}

function addNewFriendView() {
    container.innerHTML = /*HTML*/ `
        <h2>Add New Friend</h2>
        <div class="friend-search-container">
            <label for="searchUsername">Search by Username:</label>
            <input type="text" id="searchUsername" onkeyup="searchUsers()" placeholder="Enter username">
            <div id="searchResults" class="search-results"></div>
        </div>
        <button onclick="showAllFriends()">Back to Friends</button>
    `;
    searchResultsContainer = document.getElementById('searchResults');
}

function searchUsers() {
    const searchTerm = document.getElementById('searchUsername').value.toLowerCase();
    const filteredUsers = usersArray.filter(user =>
        user.username.toLowerCase().includes(searchTerm) &&
        !friendArray.some(friend => friend.id === user.id) // Don't show existing friends
    );

    searchResultsContainer.innerHTML = '<ul>' + filteredUsers.map(user => `
        <li onclick="addFriend(${user.id}, '${user.username}', '${user.name}', '${user.aboutMe}', '${user.favoriteSlopeID}', '${user.favoriteSlopeID}', '${user.status}', '${user.chat}', '${user.friendsID}', '${user.statistics}')">${user.username} (${user.name})</li>
    `).join('') + '</ul>';

    if (searchTerm === '' || filteredUsers.length === 0) {
        searchResultsContainer.innerHTML = '<p>No users found.</p>'; // More informative message
    }
}

function addFriend(userId, username, name, aboutMe, favoriteSlopeID, favoriteLocationID, status, chat, friendsID, statistics) {
    if (friendArray.some(friend => friend.id === userId)) {
        alert("This user is already in your friends list.");
        return;
    }
    const newFriend = {
        id: userId,
        username: username,
        name: name,
        aboutMe: aboutMe,
        favoriteSlopeID: favoriteSlopeID,
        favoriteLocationID: favoriteLocationID,
        status: status,
        chat: chat,
        friendsID: friendsID,
        statistics: statistics
    };
    friendArray.push(newFriend);
    addNewFriendView(); // Refresh the add friend view
}

// Initial render
showAllFriends();