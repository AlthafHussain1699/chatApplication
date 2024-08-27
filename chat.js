const socket = io(); // Establish socket connection

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Store the user's socket ID to differentiate their messages
const currentUserId = socket.id;

// Listen for messages from the server
socket.on('message', (messageObj) => {
    const div = document.createElement('div');
    div.classList.add('message');

    // Determine if the message is from the current user or another user
    if (messageObj.senderId === currentUserId) {
        div.classList.add('my-message'); // Message from the current user
    } else {
        div.classList.add('other-message'); // Message from other users
    }

    div.textContent = messageObj.msg;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
});

// Send message when button is clicked
sendBtn.addEventListener('click', () => {
    const msg = messageInput.value;
    if (msg.trim() !== '') {
        socket.emit('chatMessage', msg); // Emit the message to the server
        messageInput.value = ''; // Clear the input field
        messageInput.focus();
    }
});

// Allow sending message by pressing Enter key
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click(); // Trigger the send button click event
    }
});
