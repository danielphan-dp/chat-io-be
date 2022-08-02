const ServerStateService = require('../../state.services/serverStore');

const emitOnlineUsers = (ioNamespace) => {
  ioNamespace.emit('online-users', {
    onlineUsers: ServerStateService.getOnlineClients(),
  });
};

module.exports = emitOnlineUsers;
