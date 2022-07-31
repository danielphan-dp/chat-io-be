const ServerStateService = require('../state.services/serverStore');

const initializeIoServer = (server) => {
  ServerStateService.setIo(require('socket.io')(server, require('./_configs')));
};

module.exports = initializeIoServer;
