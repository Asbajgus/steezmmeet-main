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


function renderGalleri() {
    const galleriContent = document.getElementById("galleriContent");
    galleriContent.innerHTML = model.data.gallery.map(item => `
        <div class="galleri-card">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <img src="${item.src}" alt="${item.title}">
            <button onclick="viewGalleriItem(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                ${item.type === 'image' ? 'View Image' : 'Play Video'}
            </button>
        </div>
    `).join('');
}

