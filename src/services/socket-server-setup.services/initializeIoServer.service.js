const ServerStateService = require('../state.services/serverStore');
const { _configs } = require('./_configs');

const initializeIoServer = (server) => {
  ServerStateService.setIo(require('socket.io')(server, _configs));
};

module.exports = initializeIoServer;
