const emitOnlineUsers = require('./emitOnlineUsers.service');

const emitOnlineUsersWithPolling = (ioNamespace, pollingInterval) => {
  setInterval(() => {
    emitOnlineUsers(ioNamespace);
  }, [pollingInterval]);
};

module.exports = emitOnlineUsersWithPolling;
