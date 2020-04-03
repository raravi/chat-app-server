const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const socket = require("./socket");
const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();
const port = 8000;

const users = require("./routes/api/users");
const db = require("./config/keys").mongoURI;

/**
 * Index.js does the following:
 * 1. Sets up middleware for Rate Limiting & Body Parser (used for JSON).
 * 2. Connects to the MongoDB for CRUD operations.
 * 3. Express server to serve API endpoints & /resetpassword webpage
 * 4. Connects socket.io to Express server to enable realtime
 * bidirectional communication for chat messaging functionality.
 */

// Enable CORS
app.use(cors());

// Rate Limiter Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
//  apply limiter to all requests
app.use(limiter);

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Start server
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(port);

// socket.io communication
socket(io);

// Routes
app.use("/api/users", users);

// Reset Password
app.get('/resetpassword', function(req, res) {
    res.sendFile(path.join(__dirname + '/resetpassword/index.html'));
});

console.log('Listening on port ', port);
