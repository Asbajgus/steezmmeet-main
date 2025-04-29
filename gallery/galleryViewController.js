// Function to handle editing an existing gallery item
function editGalleryItem(index) {
    // Get updated values from the edit form
    const title = document.getElementById("editGalleryTitle").value.trim();
    const description = document.getElementById("editGalleryDescription").value.trim();
    const categoryElement = document.getElementById("editGalleryCategory");
    const category = categoryElement ? categoryElement.value.trim() : "Uncategorized"; // Default if element not found
    const fileInput = document.getElementById("editGalleryFile");
    const file = fileInput.files[0];

    // Get the original item
    const originalItem = model.data.gallery[index];
    if (!originalItem) {
        console.error("Original item not found for editing!");
        alert("Error: Could not find the item to edit.");
        renderGallery(); // Go back to gallery view
        return;
    }

    // Prepare the updated item object
    const updatedItem = {
        ...originalItem, // Keep original id and potentially other properties
        title: title,
        description: description,
        category: category,
    };

    // If a new file is selected, process it
    if (file) {
        const fileType = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : null;
        if (!fileType) {
            alert("Invalid file type. Only images and videos are allowed.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            // Update item with new file details
            updatedItem.type = fileType;
            updatedItem.src = e.target.result;

            // Update the model
            model.data.gallery[index] = updatedItem;
            console.log("Item updated with new file:", model.data.gallery[index]);

            // Re-render the gallery and show the updated item view
            renderGallery();
            viewGalleryItem(model.data.gallery[index], index);
        };
        reader.onerror = function() {
            console.error("File reading failed!");
            alert("Error reading the file. Please try again.");
        };
        reader.readAsDataURL(file); // Read the file
    } else {
        // If no new file, just update the model with text changes
        model.data.gallery[index] = updatedItem;
        console.log("Item updated (no new file):", model.data.gallery[index]);

        // Re-render the gallery and show the updated item view
        renderGallery();
        viewGalleryItem(model.data.gallery[index], index);
    }
}

// Function to delete a gallery item
function deleteGalleryItem(index) {
    // Confirm deletion with the user
    if (confirm("Are you sure you want to delete this item?")) {
        if (index >= 0 && index < model.data.gallery.length) {
            model.data.gallery.splice(index, 1); // Remove the item from the model array
            console.log("Item deleted at index:", index);
            backToGallery(); // Go back to the main gallery view
        } else {
            console.error("Invalid index for deletion:", index);
            alert("Error: Could not delete the item.");
            backToGallery(); // Go back even if deletion fails
        }
    }
}


// Function to add a new gallery item
function addGalleryItem() {
    // Get values from the add form
    const title = document.getElementById("newGalleryTitle").value.trim();
    const description = document.getElementById("newGalleryDescription").value.trim();
    const category = document.getElementById("newGalleryCategory").value.trim();
    const fileInput = document.getElementById("newGalleryFile");
    const file = fileInput.files[0];

    // Validate input
    if (!title || !description || !category) {
        alert("Please fill in Title, Description, and Category.");
        return;
    }
    if (!file) {
        alert("Please select a file.");
        return;
    }

    // Validate file type
    const fileType = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : null;
    if (!fileType) {
        alert("Invalid file type. Only images and videos are allowed.");
        return;
    }

    // Read the file
    const reader = new FileReader();
    reader.onload = function (e) {
        // Create the new item object
        const newItem = {
            // Assign a simple unique ID (replace with better ID generation if needed)
            id: Date.now(),
            title: title,
            description: description,
            category: category || "Uncategorized", // Default if empty
            type: fileType,
            src: e.target.result, // Use the file reader result as the source
        };
        model.data.gallery.push(newItem); // Add the new item to the model
        console.log("New item added:", newItem);
        renderGallery(); // Re-render the gallery to show the new item
    };
     reader.onerror = function() {
        console.error("File reading failed during add!");
        alert("Error reading the file. Please try again.");
    };
    reader.readAsDataURL(file);
}


// Function to add a new category to the list
function addCategory() {
    const newCategoryInput = document.getElementById("newCategoryName");
    const categoryName = newCategoryInput.value.trim();

    if (!categoryName) {
        alert("Category name cannot be empty.");
        return;
    }
    // Check if category already exists (case-insensitive check)
    if (model.data.categories.some(cat => cat.toLowerCase() === categoryName.toLowerCase())) {
        alert("Category already exists.");
        return;
    }

    model.data.categories.push(categoryName); // Add to the model
    console.log("Category added:", categoryName);
    newCategoryInput.value = ""; // Clear the input field

    // Refresh the category management list if it's visible
    const manageCategoriesSection = document.getElementById("manageCategoriesSection");
     if (manageCategoriesSection && manageCategoriesSection.style.display !== "none") {
         const categoryList = document.getElementById("categoryList");
         if (categoryList) {
             categoryList.innerHTML = model.data.categories.map((category, index) => `
                    <li>
                        ${category}
                        <button onclick="deleteCategory(${index})">Delete</button>
                    </li>
                `).join('');
         }
     }

     // Refresh the category dropdown in the Add Item form if it's currently displayed
     const addCategoryDropdown = document.getElementById("newGalleryCategory");
     if (addCategoryDropdown) {
         addCategoryDropdown.innerHTML = `
            <option value="">-- Select Category --</option>
            ${model.data.categories.map(category => `<option value="${category}">${category}</option>`).join('')}
            <option value="Uncategorized">Uncategorized</option>`;
     }

     // Refresh the category filter dropdown
     const filterCategoryDropdown = document.getElementById("categoryFilter");
     if (filterCategoryDropdown) {
         const currentFilterValue = filterCategoryDropdown.value;
         filterCategoryDropdown.innerHTML = `
            <option value="All">All Categories</option>
            ${model.data.categories.map(category => `<option value="${category}" ${currentFilterValue === category ? "selected" : ""}>${category}</option>`).join('')}`;
     }
}

// Function to delete a category
function deleteCategory(index) {
    if (index >= 0 && index < model.data.categories.length) {
        const categoryToDelete = model.data.categories[index];
        // Confirm deletion
        if (confirm(`Are you sure you want to delete the category "${categoryToDelete}"? Items in this category will become "Uncategorized".`)) {
            model.data.categories.splice(index, 1); // Remove from model
            console.log("Category deleted:", categoryToDelete);

            // Update items that used this category to "Uncategorized"
             model.data.gallery.forEach(item => {
                 if (item.category === categoryToDelete) {
                     item.category = "Uncategorized";
                 }
             });

            // Refresh the category management list if visible
            const manageCategoriesSection = document.getElementById("manageCategoriesSection");
            if (manageCategoriesSection && manageCategoriesSection.style.display !== "none") {
                 const categoryList = document.getElementById("categoryList");
                 if (categoryList) {
                    categoryList.innerHTML = model.data.categories.map((category, i) => `
                            <li>
                                ${category}
                                <button onclick="deleteCategory(${i})">Delete</button>
                            </li>
                        `).join('');
                 }
            }
             // Refresh the main gallery view to reflect potential category changes
             renderGallery();
        }
    } else {
        console.error("Invalid index for category deletion:", index);
    }
}


// Function to navigate back to the main gallery view from the item view
function backToGallery() {
    const galleryContainer = document.getElementById("galleryContainer");
    const galleryItemContainer = document.getElementById("galleryItemContainer");

    if (galleryContainer && galleryItemContainer) {
        galleryItemContainer.style.display = "none"; // Hide item view
        galleryContainer.style.display = "block";   // Show gallery grid
        renderGallery(); // Re-render the gallery grid
    } else {
        console.error("Navigation containers not found!");
        navigateTo('dashboard'); // Fallback navigation
    }
}


// Function to add a new category directly from the edit item form
function addEditCategory() {
    const newCategoryInput = document.getElementById("newEditCategoryName");
    const categoryName = newCategoryInput.value.trim();

    if (!categoryName) {
        alert("Category name cannot be empty.");
        return;
    }
    if (model.data.categories.some(cat => cat.toLowerCase() === categoryName.toLowerCase())) {
        alert("Category already exists.");
        return;
    }

    model.data.categories.push(categoryName); // Add to model
    console.log("Category added from edit form:", categoryName);
    newCategoryInput.value = ""; // Clear input

    // Refresh the category dropdown in the currently open edit form
    const categoryDropdown = document.getElementById("editGalleryCategory");
    if (categoryDropdown) {
         // Rebuild dropdown options, selecting the newly added one
        categoryDropdown.innerHTML = `
            <option value="">-- Select Category --</option>
            ${model.data.categories.map(category => `
                <option value="${category}" ${category === categoryName ? "selected" : ""}>${category}</option>
            `).join('')}
            <option value="Uncategorized">Uncategorized</option>
        `;
    }
     // Refresh the main category filter dropdown as well
     const filterCategoryDropdown = document.getElementById("categoryFilter");
     if (filterCategoryDropdown) {
         const currentFilterValue = filterCategoryDropdown.value;
         filterCategoryDropdown.innerHTML = `
            <option value="All">All Categories</option>
            ${model.data.categories.map(category => `<option value="${category}" ${currentFilterValue === category ? "selected" : ""}>${category}</option>`).join('')}`;
     }
}


// Function to display the form for editing an existing gallery item
function showEditGalleryItemForm(index) {
    if (index < 0 || index >= model.data.gallery.length) {
        console.error("Invalid index for editing:", index);
        alert("Error: Cannot edit this item.");
        backToGallery();
        return;
    }
    const item = model.data.gallery[index];
    const galleryItemContent = document.getElementById("galleryItemContent"); // Use the specific container for item view/edit

     if (!galleryItemContent) {
        console.error("Gallery item content container not found for editing!");
        return;tricks
    }

    // Display the edit form within the item view container
    galleryItemContent.innerHTML = `
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
                     <option value="Uncategorized" ${item.category === "Uncategorized" ? "selected" : ""}>Uncategorized</option>
                </select>
            </p>
            <p><strong>Add New Category:</strong><br>
                <input type="text" id="newEditCategoryName" placeholder="Enter new category name">
                <button type="button" onclick="addEditCategory()">Add Category</button>
            </p>
            <p><strong>Current File:</strong> ${item.type === 'image' ? `<img src="${item.src}" alt="Current" style="max-height: 50px; vertical-align: middle;">` : `[Current Video]`}</p>
            <p><strong>Replace File (Optional):</strong><br>
                <input type="file" id="editGalleryFile" accept="image/*,video/*">
            </p>
            <button type="button" onclick="editGalleryItem(${index})">Save Changes</button>
             <button type="button" onclick='viewGalleryItem(${JSON.stringify(item).replace(/'/g, "&apos;")}, ${index})'>Cancel</button>
        </form>
    `;
    // Ensure the item container is visible (it should already be if viewGalleryItem was called)
    document.getElementById("galleryItemContainer").style.display = "block";
    document.getElementById("galleryContainer").style.display = "none"; // Hide main gallery
}