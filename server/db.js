const mongoose = require("mongoose");

// Config from Environment variables
let db = process.env.APP_DB;

// Connect to MongoDB
// mongoose
//   .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));

mongoose.connect(db);
mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function() {
  console.log('MongoDB successfully connected');
});

module.exports = mongoose.connection;
