function viewImage(title) {
    alert(`Viewing image: ${title}`);
}
let selectedGalleriItem = null;

function viewGalleriItem(item, index) {
    console.log("Viewing item:", item);
    selectedGalleriItem = item;
    const content = document.getElementById("galleriItemContent");

    if (item.type === "image") {
        console.log("Image path:", item.src); // Logowanie ścieżki do obrazu
    }

    content.innerHTML = `
        ${item.type === "image" ? `<img src="${item.src}" alt="${item.title}" style="max-width: 100%;">` : ""}
        ${item.type === "video" ? `<video src="${item.src}" controls style="max-width: 100%;"></video>` : ""}
        <h2>${item.title}</h2>
        <p>${item.description}</p>
        <button class="edit-button" onclick="showEditGalleriItemForm(${index})">Edit</button>
        <button class="delete-button" onclick="deleteGalleriItem(${index})">Delete</button>
        <button onclick="backToDashboard()">Back to Dashboard</button>
        <button onclick="backToGalleri()">Back to Galleri</button>
    `;

    document.getElementById("galleriContainer").style.display = "none";
    document.getElementById("galleriItemContainer").style.display = "block";
}




// knapp '+ ' !!!!!
function renderGalleri() {
    const galleriContent = document.getElementById("galleriContent");
    const selectedCategory = document.getElementById("categoryFilter")?.value || "All";
    const filteredGallery = selectedCategory === "All"
        ? model.data.gallery
        : model.data.gallery.filter(item => item.category === selectedCategory);

    const groupedGallery = groupGalleryByCategory(filteredGallery);

    galleriContent.innerHTML = `
        <div class="gallery-header">
            <button class="add-item-button" onclick="showAddGalleriItemForm()">+</button>
            <select id="categoryFilter" onchange="renderGalleri()">
                <option value="All">All Categories</option>
                ${model.data.categories.map(category => `
                    <option value="${category}" ${selectedCategory === category ? "selected" : ""}>${category}</option>
                `).join('')}
            </select>
        </div>
        ${Object.keys(groupedGallery).map(category => `
            <h2>${category}</h2>
            <div class="galleri-category">
                ${groupedGallery[category].map((item, index) => `
                    <div class="galleri-card" onclick="viewGalleriItem(model.data.gallery[${index}], ${index})">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <img src="${item.src}" alt="${item.title}">
                    </div>
                `).join('')}
            </div>
        `).join('')}
    `;
}

function groupGalleryByCategory(gallery) {
    return gallery.reduce((groups, item) => {
        const category = item.category || "Uncategorized";
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(item);
        return groups;
    }, {});
}

function showEditGalleriItemForm(index) {
    const item = model.data.gallery[index];
    const galleriContent = document.getElementById("galleriItemContent");
    galleriContent.innerHTML = `
        <h2>Edit Gallery Item</h2>
        <form id="editGalleriItemForm">
            <p><strong>Title:</strong><br>
                <input type="text" id="editGalleriTitle" value="${item.title}" required>
            </p>
            <p><strong>Description:</strong><br>
                <textarea id="editGalleriDescription" rows="3" required>${item.description}</textarea>
            </p>
            <p><strong>Category:</strong><br>
                <select id="editGalleriCategory" required>
                    <option value="">-- Select Category --</option>
                    ${model.data.categories.map(category => `
                        <option value="${category}" ${item.category === category ? "selected" : ""}>${category}</option>
                    `).join('')}
                </select>
            </p>
            <p><strong>Add New Category:</strong><br>
                <input type="text" id="newEditCategoryName" placeholder="Enter new category name">
                <button type="button" onclick="addEditCategory()">Add Category</button>
            </p>
            <p><strong>File:</strong><br>
                <input type="file" id="editGalleriFile" accept="image/*,video/*">
            </p>
            <button type="button" onclick="editGalleriItem(${index})">Save Changes</button>
            <button type="button" onclick="viewGalleriItem(model.data.gallery[${index}], ${index})">Cancel</button>
        </form>
    `;
}

function showAddGalleriItemForm() {
    const galleriContent = document.getElementById("galleriContent");
    galleriContent.innerHTML = `
        <h2>Add New Gallery Item</h2>
        <form id="addGalleriItemForm">
            <p><strong>Title:</strong><br>
                <input type="text" id="newGalleriTitle" required>
            </p>
            <p><strong>Description:</strong><br>
                <textarea id="newGalleriDescription" rows="3" required></textarea>
            </p>
            <p><strong>Category:</strong><br>
                <select id="newGalleriCategory" required>
                    <option value="">-- Select Category --</option>
                    ${model.data.categories.map(category => `
                        <option value="${category}">${category}</option>
                    `).join('')}
                </select>
            </p>
            <p><strong>File:</strong><br>
                <input type="file" id="newGalleriFile" accept="image/*,video/*" required>
            </p>
            <button type="button" onclick="addGalleriItem()">Add Item</button>
            <button type="button" onclick="renderGalleri()">Cancel</button>
        </form>
        <button class="manage-categories-button" onclick="toggleManageCategories()">Manage Categories</button>
        <div id="manageCategoriesSection" style="display: none;">
            <h3>Manage Categories</h3>
            <ul id="categoryList">
                ${model.data.categories.map((category, index) => `
                    <li>
                        ${category}
                        <button onclick="deleteCategory(${index})">Delete</button>
                    </li>
                `).join('')}
            </ul>
            <p><strong>Add New Category:</strong><br>
                <input type="text" id="newCategoryName" placeholder="Enter category name">
            </p>
            <button onclick="addCategory()">Add Category</button>
        </div>
    `;
}


function toggleManageCategories() {
    const manageCategoriesSection = document.getElementById("manageCategoriesSection");
    manageCategoriesSection.style.display = manageCategoriesSection.style.display === "none" ? "block" : "none";
}

function addGalleriItem() {
    const title = document.getElementById("newGalleriTitle").value.trim();
    const description = document.getElementById("newGalleriDescription").value.trim();
    const category = document.getElementById("newGalleriCategory").value;
    const fileInput = document.getElementById("newGalleriFile");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file.");
        return;
    }

    const fileType = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : null;
    if (!fileType) {
        alert("Only images and videos are allowed.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const newItem = {
            title: title,
            description: description,
            category: category,
            type: fileType,
            src: e.target.result,
        };
        model.data.gallery.push(newItem); // Add the new item to the model
        renderGalleri(); // Re-render the gallery
    };
    reader.readAsDataURL(file); // Read the file as a data URL
}

function showEditGalleriItemForm(index) {
    const item = model.data.gallery[index];
    const galleriContent = document.getElementById("galleriItemContent");
    galleriContent.innerHTML = `
        <h2>Edit Gallery Item</h2>
        <form id="editGalleriItemForm">
            <p><strong>Title:</strong><br>
                <input type="text" id="editGalleriTitle" value="${item.title}" required>
            </p>
            <p><strong>Description:</strong><br>
                <textarea id="editGalleriDescription" rows="3" required>${item.description}</textarea>
            </p>
            <p><strong>File:</strong><br>
                <input type="file" id="editGalleriFile" accept="image/*,video/*">
            </p>
            <button type="button" onclick="editGalleriItem(${index})">Save Changes</button>
            <button type="button" onclick="viewGalleriItem(model.data.gallery[${index}], ${index})">Cancel</button>
        </form>
    `;
}
