function editGalleryItem(index) {
    const title = document.getElementById("editGalleryTitle").value.trim();
    const description = document.getElementById("editGalleryDescription").value.trim();
    const categoryElement = document.getElementById("editGalleryCategory");
    const category = categoryElement ? categoryElement.value.trim() : "Uncategorized"; // Default to "Uncategorized" if not found
    const fileInput = document.getElementById("editGalleryFile");
    const file = fileInput.files[0];

    if (file) {
        const fileType = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : null;
        if (!fileType) {
            alert("Only images and videos are allowed.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            model.data.gallery[index] = {
                title: title,
                description: description,
                category: category,
                type: fileType,
                src: e.target.result,
            };
            console.log(model.data.gallery[index]);
            renderGallery(); // Re-render the gallery
            viewGalleryItem(model.data.gallery[index], index); // Show updated item
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    } else {
        // Update only title, description, and category if no new file is uploaded
        model.data.gallery[index].title = title;
        model.data.gallery[index].description = description;
        model.data.gallery[index].category = category;
        renderGallery(); // Re-render the gallery
        viewGalleryItem(model.data.gallery[index], index); // Show updated item
    }
}

function deleteGalleryItem(index) {
    if (confirm("Are you sure you want to delete this item?")) {
        model.data.gallery.splice(index, 1); // Remove the item from the model
        renderGallery(); // Re-render the gallery
    }
}

function addGalleryItem() {
    const title = document.getElementById("newGalleryTitle").value.trim();
    const description = document.getElementById("newGalleryDescription").value.trim();
    const category = document.getElementById("newGalleryCategory").value.trim();
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
            category: category || "Uncategorized",
            type: fileType,
            src: e.target.result,
        };
        model.data.gallery.push(newItem); // Add the new item to the model
        renderGallery(); // Re-render the gallery
    };
    reader.readAsDataURL(file); // Read the file as a data URL
}

function addCategory() {
    const categoryName = document.getElementById("newCategoryName").value.trim();
    if (!categoryName) {
        alert("Category name cannot be empty.");
        return;
    }
    if (model.data.categories.includes(categoryName)) {
        alert("Category already exists.");
        return;
    }
    model.data.categories.push(categoryName);
    showAddGalleryItemForm(); // Refresh the "Add Item" form to include the new category
}

function deleteCategory(index) {
    if (confirm("Are you sure you want to delete this category?")) {
        model.data.categories.splice(index, 1);
        showAddGalleryItemForm(); // Refresh the "Add Item" form to reflect the changes
    }
}


function backToGallery() {
    document.getElementById("galleryItemContainer").style.display = "none";
    document.getElementById("galleryContainer").style.display = "block";
    renderGallery(); // Re-render the gallery after deletion
}


function addEditCategory() {
    const newCategoryName = document.getElementById("newEditCategoryName").value.trim();
    if (!newCategoryName) {
        alert("Category name cannot be empty.");
        return;
    }
    if (model.data.categories.includes(newCategoryName)) {
        alert("Category already exists.");
        return;
    }
    model.data.categories.push(newCategoryName);
    alert("Category added successfully.");
    // Refresh the category dropdown in the edit form
    const categoryDropdown = document.getElementById("editGalleryCategory");
    categoryDropdown.innerHTML += `<option value="${newCategoryName}" selected>${newCategoryName}</option>`;
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