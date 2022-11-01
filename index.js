if (process.env.ENVIRONMENT != 'PROD') {
  require('dotenv').config();
}
const app = require("./server");
const socket = require("./socket");
const port = 8000;

// Config from Environment variables
let keys = {};
keys.clientUrl = process.env.APP_CLIENTURL;

// socket.io communication
const server = require('http').Server(app);
const io = require('socket.io')(server, { cors : {
  origin:[/* 'http://localhost:3000',*/ keys.clientUrl],
  methods:['GET','POST'],
} });
socket(io);

// Start server
server.listen(process.env.PORT || port, () => console.log('Listening on port ', port));
