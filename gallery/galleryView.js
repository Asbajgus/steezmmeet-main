function viewImage(title) {
    alert(`Viewing image: ${title}`);
}
let selectedGalleryItem = null;

function viewGalleryItem(item, index) {
    console.log("Viewing item:", item);
    selectedGalleryItem = item;
    const content = document.getElementById("galleryItemContent");

    if (item.type === "image") {
        console.log("Image path:", item.src); // Logowanie ścieżki do obrazu
    }

    content.innerHTML = `
        ${item.type === "image" ? `<img src="${item.src}" alt="${item.title}" style="max-width: 100%;">` : ""}
        ${item.type === "video" ? `<video src="${item.src}" controls style="max-width: 100%;"></video>` : ""}
        <h2>${item.title}</h2>
        <p>${item.description}</p>
        <button class="edit-button" onclick="showEditGalleryItemForm(${index})">Edit</button>
        <button class="delete-button" onclick="deleteGalleryItem(${index})">Delete</button>
        <button onclick="backToDashboard()">Back to Dashboard</button>
        <button onclick="backToGallery()">Back to Gallery</button>
    `;

    document.getElementById("galleryContainer").style.display = "none";
    document.getElementById("galleryItemContainer").style.display = "block";
}




// knapp '+ ' !!!!!
function renderGallery() {
    const galleryContent = document.getElementById("galleryContent");
    const selectedCategory = document.getElementById("categoryFilter")?.value || "All";
    const filteredGallery = selectedCategory === "All"
        ? model.data.gallery
        : model.data.gallery.filter(item => item.category === selectedCategory);

    let galleryHTML = `
        <div class="gallery-header">
            <button class="add-item-button" onclick="showAddGalleryItemForm()">+</button>
            <select id="categoryFilter" onchange="renderGallery()">
                <option value="All">All Categories</option>
                ${model.data.categories.map(category => `
                    <option value="${category}" ${selectedCategory === category ? "selected" : ""}>${category}</option>
                `).join('')}
            </select>
        </div>
    `;

    model.data.categories.forEach(category => {
        const categoryItems = filteredGallery.filter(item => item.category === category);
        if (categoryItems.length > 0) {
            galleryHTML += `
                <h2>${category}</h2>
                <div class="gallery-category">
            `;
            categoryItems.forEach((item, index) => {
                galleryHTML += `
                    <div class="gallery-card" onclick="viewGalleryItem(model.data.gallery[${index}], ${index})">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <img src="${item.src}" alt="${item.title}">
                    </div>
                `;
            });
            galleryHTML += `</div>`;
        }
    });

    galleryContent.innerHTML = galleryHTML;
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

function showEditGalleryItemForm(index) {
    const item = model.data.gallery[index];
    const galleryContent = document.getElementById("galleryItemContent");
    galleryContent.innerHTML = `
        <h2>Edit Gallery Item</h2>
        <form id="editGalleryItemForm">
            <p><strong>Title:</strong><br>
                <input type="text" id="editGalleryTitle" value="${item.title}" required>
            </p>
            <p><strong>Description:</strong><br>
                <textarea id="editGalleryDescription" rows="3" required>${item.description}</textarea>
            </p>
            <p><strong>Category:</strong><br>
                <select id="editGalleryCategory" required>
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
                <input type="file" id="editGalleryFile" accept="image/*,video/*">
            </p>
            <button type="button" onclick="editGalleryItem(${index})">Save Changes</button>
            <button type="button" onclick="viewGalleryItem(model.data.gallery[${index}], ${index})">Cancel</button>
        </form>
    `;
}

function showAddGalleryItemForm() {
    const galleryContent = document.getElementById("galleryContent");
    galleryContent.innerHTML = `
        <h2>Add New Gallery Item</h2>
        <form id="addGalleryItemForm">
            <p><strong>Title:</strong><br>
                <input type="text" id="newGalleryTitle" required>
            </p>
            <p><strong>Description:</strong><br>
                <textarea id="newGalleryDescription" rows="3" required></textarea>
            </p>
            <p><strong>Category:</strong><br>
                <select id="newGalleryCategory" required>
                    <option value="">-- Select Category --</option>
                    ${model.data.categories.map(category => `
                        <option value="${category}">${category}</option>
                    `).join('')}
                </select>
            </p>
            <p><strong>File:</strong><br>
                <input type="file" id="newGalleryFile" accept="image/*,video/*" required>
            </p>
            <button type="button" onclick="addGalleryItem()">Add Item</button>
            <button type="button" onclick="renderGallery()">Cancel</button>
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

function addGalleryItem() {
    const title = document.getElementById("newGalleryTitle").value.trim();
    const description = document.getElementById("newGalleryDescription").value.trim();
    const category = document.getElementById("newGalleryCategory").value;
    const fileInput = document.getElementById("newGalleryFile");
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
        renderGallery(); // Re-render the gallery
    };
    reader.readAsDataURL(file); // Read the file as a data URL
}

function showEditGalleryItemForm(index) {
    const item = model.data.gallery[index];
    const galleryContent = document.getElementById("galleryItemContent");
    galleryContent.innerHTML = `
        <h2>Edit Gallery Item</h2>
        <form id="editGalleryItemForm">
            <p><strong>Title:</strong><br>
                <input type="text" id="editGalleryTitle" value="${item.title}" required>
            </p>
            <p><strong>Description:</strong><br>
                <textarea id="editGalleryDescription" rows="3" required>${item.description}</textarea>
            </p>
            <p><strong>File:</strong><br>
                <input type="file" id="editGalleryFile" accept="image/*,video/*">
            </p>
            <button type="button" onclick="editGalleryItem(${index})">Save Changes</button>
            <button type="button" onclick="viewGalleryItem(model.data.gallery[${index}], ${index})">Cancel</button>
        </form>
    `;
}
