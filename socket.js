const jwt = require("jsonwebtoken");

// Config from Environment variables
let keys = {};
keys.secretOrKey = process.env.CHATAPP_SECRETORKEY;
keys.clientUrl = process.env.CHATAPP_CLIENTURL;

/**
 * Load Message model
 */
const Message = require("./models/Message");

/**
 * Set up socket.io to handle connections from clients
 */
exports = module.exports = function(io) {
  // Set socket.io listeners.
  io.on("connection", client => {
    let userOfSession;
    if (client.handshake.headers.origin !== keys.clientUrl) {
      client.disconnect(true);
    }

    // Authenticate User on login, send chat history
    client.on("authenticateUser", user => {
      jwt.verify(user.token.slice(7), keys.secretOrKey, (err, decoded) => {
        if (err || decoded.exp < Date.now() / 1000) {
          client.disconnect(true);
          console.log("Token verification error!");
          return;
        }
        userOfSession = {id: decoded.id, name: decoded.name};
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
    });

    // On receiving message from user, authenticate user.
    // Then save message in DB and forward to other logged-in users.
    client.on("sendMessage", message => {
      jwt.verify(message.token.slice(7), keys.secretOrKey, (err, decoded) => {
        if (err || decoded.exp < Date.now() / 1000) {
          client.disconnect(true);
          console.log("Token verification error!");
          return;
        }
        if (userOfSession &&
            decoded.id === userOfSession.id &&
            decoded.name === userOfSession.name
          ) {
          const newMessage = new Message({
            userid: decoded.id,
            username: decoded.name,
            message: message.message
          });
          newMessage
            .save()
            .then(() => console.log("Message added to DB!"))
            .catch(err => console.log(err));
          client.broadcast.emit("newMessage", {
            user: {
              id: decoded.id,
              name: decoded.name
            },
            message: message.message
          });
        } else {
          client.disconnect(true);
        }
      });
    });
  });
};
