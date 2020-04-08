const mongoose = require("mongoose");
const db = require("../config/keys").mongoURI;

// Connect to MongoDB
// mongoose
//   .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function() {
  console.log('MongoDB successfully connected');
});

module.exports = mongoose.connection;
