const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle messages from clients
  socket.on('move', (data) => {
    console.log('Move received:', data);
    // Broadcast the move to other clients
    socket.broadcast.emit('move', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
