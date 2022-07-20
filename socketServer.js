const registerSocketServer = (server) => {
  // initialize socket server
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  // start the first server action
  io.on('connection', (socket) => {
    console.log('user connected');
    console.log(socket.id);
  });
};

module.exports = {
  registerSocketServer,
};
