const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New user connected: ' + socket.id);

    socket.emit('message', { msg: 'Welcome to the Chat App!', senderId: socket.id });

    socket.broadcast.emit('message', { msg: 'A new user has joined the chat', senderId: socket.id });

    socket.on('chatMessage', (msg) => {
        io.emit('message', { msg: msg, senderId: socket.id });
    });

    socket.on('disconnect', () => {
        io.emit('message', { msg: 'A user has left the chat', senderId: socket.id });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
