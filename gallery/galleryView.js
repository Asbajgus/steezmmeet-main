let selectedGalleryItem = null;

// Function to display a single gallery item enlarged
function viewGalleryItem(item, index) {
    console.log("Viewing item:", item);
    selectedGalleryItem = item; // Store the selected item
    const galleryItemContainer = document.getElementById("galleryItemContainer");
    const content = document.getElementById("galleryItemContent");

    // Ensure containers exist before manipulating
    if (!galleryItemContainer || !content) {
        console.error("Gallery item containers not found!");
        return;
    }

    // Generate HTML based on item type
    let itemHTML = '';
    if (item.type === "image") {
        console.log("Image path:", item.src); // Log image path for debugging
        itemHTML = `<img src="${item.src}" alt="${item.title}" style="max-width: 100%;">`;
    } else if (item.type === "video") {
        itemHTML = `<video src="${item.src}" controls style="max-width: 100%;"></video>`;
    }

    // Set the inner HTML for the item content display area
    content.innerHTML = `
        ${itemHTML}
        <h2>${item.title}</h2>
        <p>${item.description}</p>
        <p><em>Category: ${item.category || 'Uncategorized'}</em></p>
        <button class="edit-button" onclick="showEditGalleryItemForm(${index})">Edit</button>
        <button class="delete-button" onclick="deleteGalleryItem(${index})">Delete</button>
        <button onclick="backToGallery()">Back to Gallery</button>
        <button onclick="backToDashboard()">Back to Dashboard</button>
    `;

    // Switch view visibility
    document.getElementById("galleryContainer").style.display = "none";
    galleryItemContainer.style.display = "block";
}

// Function to render the main gallery grid view
function renderGallery() {
    const galleryContent = document.getElementById("galleryContent");
    if (!galleryContent) {
        console.error("Gallery content container not found!");
        return;
    }

    // Get the selected category for filtering
    const selectedCategory = document.getElementById("categoryFilter")?.value || "All";

    // Filter gallery items based on the selected category
    const filteredGallery = selectedCategory === "All"
        ? model.data.gallery
        : model.data.gallery.filter(item => item.category === selectedCategory);

    // Start building the gallery HTML, including header with add button and category filter
    let galleryHTML = `
        <div class="gallery-header">
            <div>
                <label for="categoryFilter"> Filter by Category: </label>
                <select id="categoryFilter" onchange="renderGallery()">
                    <option value="All">All Categories</option>
                    ${model.data.categories.map(category => `
                        <option value="${category}" ${selectedCategory === category ? "selected" : ""}>${category}</option>
                    `).join('')}
                </select>
                <button class="manage-categories-button" onclick="toggleManageCategories()">Manage Categories</button>
            </div>
            <button class="add-item-button" onclick="showAddGalleryItemForm()">+</button>
        </div>
        <div id="manageCategoriesSection" style="display: none; margin-top: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
            <h3>Manage Categories</h3>
            <ul id="categoryList">
                ${model.data.categories.map((category, index) => `
                    <li>
                        ${category}
                        <button onclick="deleteCategory(${index})">Delete</button>
                    </li>
                `).join('')}
            </ul>
            <div>
                <input type="text" id="newCategoryName" placeholder="Enter new category name">
                <button onclick="addCategory()">Add Category</button>
            </div>
        </div>
        <div class="gallery-grid">
    `; // gallery-grid class added for potential styling

    // Group filtered items by category for display
    const groupedItems = groupGalleryByCategory(filteredGallery);

    // Generate HTML for each category section and its items
    for (const category in groupedItems) {
        galleryHTML += `
            <h2 class="gallery-category-title">${category}</h2>
            <div class="gallery-category-items">
        `;
        groupedItems[category].forEach(item => {
            // Find the original index of the item in the model.data.gallery array
            const originalIndex = model.data.gallery.findIndex(galleryItem => galleryItem === item);
            if (originalIndex !== -1) { // Ensure item was found
                galleryHTML += `
                    <div class="gallery-card" onclick='viewGalleryItem(${JSON.stringify(item).replace(/'/g, "&apos;")}, ${originalIndex})'>
                         ${item.type === "image" ? `<img src="${item.src}" alt="${item.title}">` : ''}
                         ${item.type === "video" ? `<div class="video-placeholder">[Video: ${item.title}]</div>` : ''}
                        <h3>${item.title}</h3>
                        <p>${item.description.substring(0, 50)}...</p>
                    </div>
                `;
            }
        });
        galleryHTML += `</div>`; // Close gallery-category-items
    }

    galleryHTML += `</div>`; // Close gallery-grid

    // Update the gallery container's HTML
    galleryContent.innerHTML = galleryHTML;
}


// Helper function to group gallery items by category
function groupGalleryByCategory(gallery) {
    return gallery.reduce((groups, item) => {
        const category = item.category || "Uncategorized"; // Default category if none exists
        if (!groups[category]) {
            groups[category] = []; // Initialize category array if it doesn't exist
        }
        groups[category].push(item); // Add item to its category group
        return groups;
    }, {});
}


// Function to display the form for adding a new gallery item
function showAddGalleryItemForm() {
    console.log("showAddGalleryItemForm called"); // Dodaj log
    const galleryContent = document.getElementById("galleryContent");
    if (!galleryContent) {
        console.error("Gallery content container not found!");
        return;
    }
    // Replace gallery content with the add item form
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
                     <option value="Uncategorized">Uncategorized</option>
                </select>
            </p>
            <p><strong>File:</strong><br>
                <input type="file" id="newGalleryFile" accept="image/*,video/*" required>
            </p>
            <button type="button" onclick="addGalleryItem()">Add Item</button>
            <button type="button" onclick="renderGallery()">Cancel</button>
        </form>

    `;
}

// Function to toggle visibility of the category management section
function toggleManageCategories() {
    const manageCategoriesSection = document.getElementById("manageCategoriesSection");
    if (manageCategoriesSection) {
        manageCategoriesSection.style.display = manageCategoriesSection.style.display === "none" ? "block" : "none";
    }
}