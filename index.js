const passport = require("passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const socket = require("./socket");
const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();
const port = 8000;

const users = require("./routes/api/users");
const db = require("./config/keys").mongoURI;

// Enable CORS
app.use(cors());

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

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
