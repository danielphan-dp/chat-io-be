const connectedClients = new Map();
let io = null;

const setIo = (ioNamespace) => (io = ioNamespace);
const getIo = () => io;

const addClient = (socketId, userId) => connectedClients.set(socketId, { userId });
const removeClient = (socketId) => connectedClients.delete(socketId);

const getActiveClientsOfUser = (userId) => {
  const activeClients = [];
  connectedClients.forEach((value, key) => value.userId === userId && activeClients.push(key));
  return activeClients;
};

const getOnlineClients = () => {
  const onlineUsers = [];
  connectedClients.forEach((value, key) => onlineUsers.push({ socketId: key, userId: value.userId }));
  return onlineUsers;
};

module.exports = {
  setIo,
  getIo,
  addClient,
  removeClient,
  getActiveClientsOfUser,
  getOnlineClients,
};
