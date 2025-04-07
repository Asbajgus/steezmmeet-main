function sendMessage() {
    const input = document.getElementById("chatMessageInput");
    const message = input.value.trim();
    if (message) {
        chatModel.push({ sender: "user", message });
        chatModel.push({ sender: "bot", message: "Got it! Let me assist you." }); // Simulate bot response
        input.value = "";
        renderChat();
    }
}
const chatModel = [
    { sender: "user", message: "Hi there!" },
    { sender: "bot", message: "Hello! How can I help you today?" },
];