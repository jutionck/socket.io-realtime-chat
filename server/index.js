const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

// implement cors for communication between server and client
app.use(cors());

const server = http.createServer(app);

// create cors
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  })

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data)
  })

  // disconnet socket
  socket.on('disconnet', () => {
    console.log('User Disconnected', socket.id);
  })
})

// listen server 3001 
server.listen(3001, () => {
  console.log('SERVER RUNNING');
})