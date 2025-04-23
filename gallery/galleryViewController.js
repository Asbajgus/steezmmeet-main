function handleAddGalleriItem() {
    const title = document.getElementById("newGalleriTitle").value.trim();
    const description = document.getElementById("newGalleriDescription").value.trim();
    const fileInput = document.getElementById("newGalleriFile");
    const file = fileInput.files[0];

    if (!title) {
        alert("Title is required.");
        return;
    }

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
            description: description || "",
            type: fileType,
            src: e.target.result,
        };
        model.data.gallery.push(newItem); // Add the new item to the model
        renderGalleri(); // Re-render the gallery
    };
    reader.readAsDataURL(file); // Read the file as a data URL
}




