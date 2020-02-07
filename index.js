const io = require('socket.io')();
let clients = [];

io.on('connection', (client) => {
  let randomNumber = Math.random() * 1000 | 0;
  console.log('New client connected: ',randomNumber);

  client.on('subscribeToTimer', (interval) => {
    console.log(randomNumber, ' client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });

  client.on('sendMessage', (message) => {
    console.log(randomNumber, 'client sent msg: ', message);
    client.broadcast.emit('newMessage', message);
  });

  client.on('disconnect', () => {
    console.log(randomNumber, ' Client disconnected');
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
