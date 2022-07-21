// -----------------------------------
// | Server Caches and Global States |
// -----------------------------------
// Cache of all users (using hashmap)
const connectedUsers = new Map();

// SocketIO server. Accessible internally inside the server store
let io = null;

// ------------------------------------
// | Server State Accessing Functions |
// ------------------------------------
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

  // remove the user and socket from the cache
  connectedUsers.delete(socketId);

  // LOG: remove when finished testing
  console.log('User deleted. New connected users:');
  console.log(connectedUsers);
};

const getActiveConnections = ({ socketId, userId }) => {
  console.log(`USER ID: ${userId}`);

  const activeConnections = [];
  connectedUsers.forEach((value, key) => {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });
  return activeConnections;
};

// ----------------------
// | Package and Export |
// ----------------------
module.exports = {
  // SocketIO Server
  getSocketServerInstance,
  setSocketServerInstance,

  // Users and Clients
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
};
