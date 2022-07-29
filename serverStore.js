const connectedUsers = new Map();
let io = null;

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = (ioInstance) => {
  return io;
};

// -------------------------------------------
// | Server State Management Functionalities |
// -------------------------------------------
const addNewConnectedUser = ({ socketId, userId }) => {
  // cache the connected user
  connectedUsers.set(socketId, { userId });

  // LOG: remove when finished testing
  console.log('User added. New connected users:');
  console.log(connectedUsers);
};

const removeConnectedUser = ({ socketId, userId }) => {
  if (!connectedUsers.has(socketId)) {
    return;
  }
  connectedUsers.delete(socketId);
};

const getActiveConnections = ({ socketId, userId }) => {
  const activeConnections = [];
  connectedUsers.forEach((value, key) => {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });
  return activeConnections;
};

const getOnlineUsers = () => {
  const onlineUsers = [];
  connectedUsers.forEach((value, key) => {
    onlineUsers.push({
      socketId: key,
      userId: value.userId,
    });
  });
  return onlineUsers;
};

module.exports = {
  // IO Access
  getSocketServerInstance,
  setSocketServerInstance,

  // User Data Cache Access
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  getOnlineUsers,
};
