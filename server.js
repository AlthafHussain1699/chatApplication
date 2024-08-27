const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New user connected: ' + socket.id);

    // Broadcast a welcome message to the new user
    socket.emit('message', { msg: 'Welcome to the Chat App!', senderId: socket.id });

    // Broadcast to all users when a new user joins
    socket.broadcast.emit('message', { msg: 'A new user has joined the chat', senderId: socket.id });

    // Handle incoming chat messages
    socket.on('chatMessage', (msg) => {
        io.emit('message', { msg: msg, senderId: socket.id });
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        io.emit('message', { msg: 'A user has left the chat', senderId: socket.id });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
