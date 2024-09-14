const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('User connected: ' + socket.id);
  let timeLeft = 10;

  const timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      socket.emit('timer', "Time's up!");
    } else {
      socket.emit('timer', timeLeft);
    }
    timeLeft -= 1;
  }, 1000);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
