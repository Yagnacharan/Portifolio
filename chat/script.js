const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message");
const nameInput = document.getElementById("name");

function sendMessage() {
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) return;

  addMessage(name + ": " + message, "user");
  messageInput.value = "";

  setTimeout(() => {
    addMessage("Bot: Got it 👍", "bot");
  }, 700);
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ENTER KEY SUPPORT
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

messageInput.focus();
