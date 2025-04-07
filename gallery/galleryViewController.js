function editGalleriItem() {
    alert("Edit functionality is not implemented yet.");
}

function deleteGalleriItem() {
    if (selectedGalleriItem) {
        const index = galleriModel.findIndex(item => item.title === selectedGalleriItem.title);
        if (index > -1) {
            galleriModel.splice(index, 1);
            backToGalleri();
        }
    }
}


function deleteGalleriItem(index) {
    model.data.gallery.splice(index, 1); // Remove the item from the model
    renderGalleri(); // Re-render the gallery
}

function addGalleriItem(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : null;
    if (!fileType) {
        alert("Only images and videos are allowed.");
        return;
    }
    const title = prompt("Enter a title for the item:");
    if (!title) {
        alert("Title is required.");
        return;
    }
    const description = prompt("Enter a description for the item (optional):");
    const reader = new FileReader();
    reader.onload = function (e) {
        const newItem = {
            title: title,
            type: fileType,
            src: e.target.result,
            description: description || "",
        };
        model.data.gallery.push(newItem); // Add the new item to the model
        renderGalleri(); // Re-render the gallery
    };
    reader.readAsDataURL(file); // Read the file as a data URL
}