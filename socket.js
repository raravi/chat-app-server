// Load User model
const Message = require("./models/Message");

exports = module.exports = function(io) {
  // Set socket.io listeners.
  io.on("connection", client => {
    let userOfSession;

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
