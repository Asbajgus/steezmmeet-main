function renderChat() {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = model.data.users[0].chat[0].conversation.map(msg => `
        <div class="chat-message ${msg.userID === model.data.users[0].id ? 'user' : 'bot'}">
            ${msg.message}
        </div>
    `).join('');
}
function renderChat() {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = ""; // Clear existing messages

    chatModel.forEach(msg => {
        const messageDiv = document.createElement("div");
        messageDiv.className = `chat-message ${msg.sender}`;
        messageDiv.innerText = msg.message;
        chatBox.appendChild(messageDiv);
    });

    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
}
