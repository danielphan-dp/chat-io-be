const serverStore = require('../serverStore');

const disconnectHandler = (socket) => {
  serverStore.removeConnectedUser({ socketId: socket.id });
};

module.exports = disconnectHandler;
