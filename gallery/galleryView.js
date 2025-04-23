function viewImage(title) {
    alert(`Viewing image: ${title}`);
}
let selectedGalleriItem = null;

function viewGalleriItem(item) {
    selectedGalleriItem = item;
    const content = document.getElementById("galleriItemContent");
    content.innerHTML = ""; // Clear existing content

    if (item.type === "image") {
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.title;
        img.style.maxWidth = "100%";
        content.appendChild(img);
    } else if (item.type === "video") {
        const video = document.createElement("video");
        video.src = item.src;
        video.controls = true;
        video.style.maxWidth = "100%";
        content.appendChild(video);
    }

    document.getElementById("galleriContainer").style.display = "none";
    document.getElementById("galleriItemContainer").style.display = "block";
}


function backToGalleri() {
    document.getElementById("galleriItemContainer").style.display = "none";
    document.getElementById("galleriContainer").style.display = "block";
    renderGalleri(); // Re-render the gallery after deletion
}

// knapp '+ ' !!11
function renderGalleri() {
    const galleriContent = document.getElementById("galleriContent");
    const galleriHTML = `
        <div class='galleri-header'>
            <button class='add-item-button' onclick="showAddGalleriItemForm()">+</button>
        </div> 
        ${model.data.gallery.map(item => `
            <div class='galleri-card'>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <img src="${item.src}" alt="${item.title}" />
            </div>
        `).join("")}
    `;
    galleriContent.innerHTML = galleriHTML;
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
                <textarea id="newGalleriDescription" rows="3"></textarea>
            </p>
            <p><strong>File:</strong><br>
                <input type="file" id="newGalleriFile" accept="image/*,video/*" required>
            </p>
            <button type="button" onclick="handleAddGalleriItem()">Add Item</button>
            <button type="button" onclick="renderGalleri()">Cancel</button>
        </form>
    `;
}

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