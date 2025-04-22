function renderAdminPage() {
    const adminContent = document.getElementById('adminContent');
    if (!adminContent) {
        console.error('adminContent element not found!');
        return;
    }

    adminContent.innerHTML = `
        <div class="admin-section">
            <h2>Manage Users</h2>
            <button onclick="renderAdminUsers()">View Users</button>
        </div>
        <div class="admin-section">
            <h2>Manage Events</h2>
            <button onclick="renderAdminEvents()">View Events</button>
        </div>
        <div class="admin-section">
            <h2>Manage Gallery</h2>
            <button onclick="renderAdminGallery()">View Gallery</button>
        </div>
        <div class="admin-section">
            <h2>Manage Friends</h2>
            <button onclick="renderAdminFriends()">View Friends</button>
        </div>
        <div class="admin-section">
            <h2>Manage Chat</h2>
            <button onclick="renderAdminChat()">View Chat</button>
        </div>
        
    `;
}

function renderAdminUsers() {
    const adminContent = document.getElementById('adminContent');
    adminContent.innerHTML = `
        <h2>Manage Users</h2>
        <table id="adminUserTable">
            <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Actions</th>
            </tr>
        </table>
        <button onclick="renderAdminPage()">Back to Admin Panel</button>
    `;

   
}



function renderAdminEvents() {
    const adminContent = document.getElementById('adminContent');
    adminContent.innerHTML = `
        <h2>Manage Events</h2>
        <table id="adminEventTable">
            <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </table>
        <button onclick="renderAdminPage()">Back to Admin Panel</button>
    `;

   
}

function editAdminEvent(index) {
    const event = model.data.events[index];
    const adminContent = document.getElementById('adminContent');
  
}



function renderAdminGallery() {
    const adminContent = document.getElementById('adminContent');
    adminContent.innerHTML = `
        <h2>Manage Gallery</h2>
        <button onclick="showAddGalleryItemForm()">Add New Item</button>
        <table id="adminGalleryTable">
            <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </table>
        <button onclick="renderAdminPage()">Back to Admin Panel</button>
    `;

    const table = document.getElementById('adminGalleryTable');
    model.data.gallery.forEach((item, index) => {
        table.innerHTML += `
            <tr>
                <td>${item.title}</td>
                <td>${item.type}</td>
                <td>${item.description}</td>
                <td>
                    <button onclick="editAdminGalleryItem(${index})">Edit</button>
                    <button onclick="deleteAdminGalleryItem(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function showAddGalleryItemForm() {
    const adminContent = document.getElementById('adminContent');
    adminContent.innerHTML = `
        <h2>Add New Gallery Item</h2>
        <form id="addGalleryItemForm">
            <p><strong>Title:</strong><br>
                <input type="text" id="newGalleryTitle" required>
            </p>
            <p><strong>Description:</strong><br>
                <textarea id="newGalleryDescription" rows="3" required></textarea>
            </p>
            <p><strong>File:</strong><br>
                <input type="file" id="newGalleryFile" accept="image/*,video/*" required>
            </p>
            <button type="button" onclick="addGalleryItem()">Add Item</button>
            <button type="button" onclick="renderAdminGallery()">Cancel</button>
        </form>
    `;
}

function addGalleryItem() {
    const title = document.getElementById('newGalleryTitle').value;
    const description = document.getElementById('newGalleryDescription').value;
    const fileInput = document.getElementById('newGalleryFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const fileType = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : null;
    if (!fileType) {
        alert('Only images and videos are allowed.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const newItem = {
            title: title,
            description: description,
            type: fileType,
            src: e.target.result,
        };
        model.data.gallery.push(newItem);
        renderAdminGallery();
    };
    reader.readAsDataURL(file);
}

function editAdminGalleryItem(index) {
    const item = model.data.gallery[index];
    const adminContent = document.getElementById('adminContent');
    adminContent.innerHTML = `
        <h2>Edit Gallery Item</h2>
        <p><strong>Title:</strong><br>
            <input type="text" id="editGalleryTitle" value="${item.title}" required>
        </p>
        <p><strong>Description:</strong><br>
            <textarea id="editGalleryDescription" rows="3" required>${item.description}</textarea>
        </p>
        <button onclick="saveAdminGalleryItem(${index})">Save</button>
        <button onclick="renderAdminGallery()">Cancel</button>
    `;
}

function saveAdminGalleryItem(index) {
    const title = document.getElementById('editGalleryTitle').value;
    const description = document.getElementById('editGalleryDescription').value;

    model.data.gallery[index].title = title;
    model.data.gallery[index].description = description;

    renderAdminGallery();
}

function deleteAdminGalleryItem(index) {
    if (confirm('Are you sure you want to delete this gallery item?')) {
        model.data.gallery.splice(index, 1);
        renderAdminGallery();
    }
}

function renderAdminFriends() {
    const adminContent = document.getElementById('adminContent');
    adminContent.innerHTML = `
        <h2>Manage Friends</h2>
        <table id="adminFriendTable">
            <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Bio</th>
                <th>Actions</th>
            </tr>
        </table>
        <button onclick="renderAdminPage()">Back to Admin Panel</button>
    `;

    
}



function renderAdminChat() {
    const adminContent = document.getElementById('adminContent');
    adminContent.innerHTML = `
        <h2>Manage Chat</h2>
        <table id="adminChatTable">
            <tr>
                <th>From</th>
                <th>To</th>
                <th>Message</th>
                <th>Actions</th>
            </tr>
        </table>
        <button onclick="renderAdminPage()">Back to Admin Panel</button>
    `;


 }