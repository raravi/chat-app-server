exports = module.exports = function (io) {
  // Set socket.io listeners.
  io.on('connection', (client) => {
    let randomNumber = Math.random() * 1000 | 0;
    let userName;
    console.log('New client connected: ',randomNumber);

    client.on('subscribeToTimer', (interval) => {
      console.log(randomNumber, ' client is subscribing to timer with interval ', interval);
      setInterval(() => {
        client.emit('timer', new Date());
      }, interval);
    });

    client.on('authenticateUser', (user) => {
      console.log('User: ', user);
      userName = user;
    });

    client.on('sendMessage', (message) => {
      console.log(randomNumber, 'client sent msg: ', message);
      client.broadcast.emit('newMessage', message);
    });

    client.on('disconnect', () => {
      console.log(randomNumber, ' Client disconnected');
    });
  });
};
