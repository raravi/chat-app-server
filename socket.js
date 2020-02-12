// Load User model
const Message = require("./models/Message");

exports = module.exports = function(io) {
  // Set socket.io listeners.
  io.on("connection", client => {
    let userOfSession;
    console.log("New client connected: ", client.id);

    client.on("authenticateUser", user => {
      console.log("User: ", user);
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

    client.on("sendMessage", message => {
      console.log(userOfSession, "client sent msg: ", message);
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

    client.on("disconnect", () => {
      console.log(userOfSession, " Client disconnected");
    });
  });
};
