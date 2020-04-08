const app = require("./server");
const socket = require("./socket");
const port = 8000;

// socket.io communication
const server = require('http').Server(app);
const io = require('socket.io')(server);
socket(io);

// Start server
server.listen(port, () => console.log('Listening on port ', port));
