if (process.env.ENVIRONMENT != 'PROD') {
  require('dotenv').config();
}
const app = require("./server");
const socket = require("./socket");
const port = 8000;

// socket.io communication
const server = require('http').Server(app);
const io = require('socket.io')(server);
socket(io);

// Start server
server.listen(process.env.PORT || port, () => console.log('Listening on port ', port));
