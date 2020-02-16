const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Message Schema for MongoDB
 */
const MessageSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

/**
 * This schema targets the 'messages' collection in MongoDB.
 */
module.exports = Message = mongoose.model("messages", MessageSchema);
