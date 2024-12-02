const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // URL của React app
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => {
  res.send('Socket.IO server is running!');
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // khi nào nhận đc tín hiệu send mess từ 1 client, thì phát tín hiệu broadMess cho các client
  socket.on('sendMess', (message) => {
    console.log('mess received: ', message);
    io.emit('broadMess', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('listening on port 5000');
});
