/**
 * Load User model
 */
const Message = require("./models/Message");

/**
 * Set up socket.io to handle connections from clients
 */
exports = module.exports = function(io) {
  // Set socket.io listeners.
  io.on("connection", client => {
    let userOfSession;

    // Authenticate User on login, send chat history
    client.on("authenticateUser", user => {
      userOfSession = user;
      Message.find({}, {}, { sort: { _id: 1 }, limit: 50 }).then(docs => {
        let messages = [];
        docs.forEach(doc =>
          messages.push({
            user: { id: doc.userid, name: doc.username },
            message: doc.message,
            date: doc.date
          })
        );
        client.emit("getOldMessages", messages);
      });
    });

    // On receiving message from user, authenticate user.
    // Then save message in DB and forward to other logged-in users. 
    client.on("sendMessage", message => {
      if (
        userOfSession &&
        message.user.id === userOfSession.id &&
        message.user.name === userOfSession.name
      ) {
        const newMessage = new Message({
          userid: message.user.id,
          username: message.user.name,
          message: message.message
        });
        newMessage
          .save()
          .then(() => console.log("Message added to DB!"))
          .catch(err => console.log(err));
        client.broadcast.emit("newMessage", message);
      } else {
        client.disconnect(true);
      }
    });
  });
};
