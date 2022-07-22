// --------------
// | Middleware |
// --------------
const authSocket = require('./middleware/authSocket');

// ----------------------------------
// | Network Communication Handlers |
// ----------------------------------
// Connection Handlers
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const disconnectHandler = require('./socketHandlers/disconnectHandler');

// Messaging Handlers
const directMessageHandler = require('./socketHandlers/directMessageHandler');
const directChatHistoryHandler = require('./socketHandlers/directChatHistoryHandler');

// ---------------------------
// | Server State Management |
// ---------------------------
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

  const emitOnlineUsers = () => {
    const onlineUsers = serverStore.getOnlineUsers();
    io.emit('online-users', { onlineUsers });
  };

  // start the first server action
  io.on('connection', (socket) => {
    // LOG: remove when finished testing
    // console.log('-- User connected --');
    // console.log(socket.id);

    // handle when a user initiates a connection to the server
    newConnectionHandler(socket, io);

    // immediately notify other users (and their connected client devices)
    // that the current user is online
    emitOnlineUsers();

    // SERVER LISTENERS
    // handle when a user sends a message to another user
    socket.on('direct-message', (clientData) => {
      // LOG: remove when finished testing
      // console.log('-- User sending direct message --');

      directMessageHandler(socket, clientData);
    });

    socket.on('direct-chat-history', (clientData) => {
      // LOG: remove when finished testing
      // console.log('-- User requesting chat history --');

      directChatHistoryHandler(socket, clientData);
    });

    // handle when a user terminates connection to the server
    socket.on('disconnect', (clientData) => {
      // LOG: remove when finished testing
      // console.log('-- User disconnecting --');

      disconnectHandler(socket);
    });
  });

  // occasionally notify other users about the online status of the
  // current user
  const UPDATE_INTERVAL = 1000 * 8;
  setInterval(() => {
    emitOnlineUsers();
  }, [UPDATE_INTERVAL]);
};

module.exports = {
  registerSocketServer,
};
