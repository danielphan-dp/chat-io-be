const ServerStateService = require('../../state.services/serverStore');

const clientDisconnectHandler = (socket) => {
  ServerStateService.removeConnectedUser({ socketId: socket.id });
};

module.exports = clientDisconnectHandler;
