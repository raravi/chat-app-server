const passport = require("passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const socket = require("./socket");
const cors = require('cors');
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
const server = app.listen(port);
const io = require('socket.io')(server);

// socket.io communication
socket(io);

// Routes
app.use("/api/users", users);

console.log('Listening on port ', port);
