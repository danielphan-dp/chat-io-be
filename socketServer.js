const authSocket = require('./middleware/authSocket');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const disconnectHandler = require('./socketHandlers/disconnectHandler');
const serverStore = require('./serverStore');

const registerSocketServer = (server) => {
  // initialize socket server, to handle requests
  // from all other origin
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  serverStore.setSocketServerInstance(io);

  io.use((socket, next) => {
    authSocket(socket, next);
  });

  // start the first server action
  io.on('connection', (socket) => {
    // TODO: remove when finished testing
    console.log('-- User connected...');
    console.log(socket.id);

    newConnectionHandler(socket, io);

    // handle the case when a user is disconnected or
    // a user intentionally close the chat
    socket.on('disconnect', () => {
      // TODO: remove when finished testing
      console.log('-- User disconnecting...');

      disconnectHandler(socket);
    });
  });
};

module.exports = {
  registerSocketServer,
};
