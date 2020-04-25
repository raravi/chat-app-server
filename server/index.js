const rateLimit = require("express-rate-limit");
const cors = require('cors');
const express = require('express');
const app = express();
const mongooseConnection = require('./db');

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

module.exports = app;
