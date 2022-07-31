const ServerStateService = require('../../state.services/serverStore');

const emitOnlineUsers = (ioNamespace) => {
  const onlineUsers = ServerStateService.getOnlineUsers();
  ioNamespace.emit('online-users', { onlineUsers });
};

module.exports = emitOnlineUsers;
