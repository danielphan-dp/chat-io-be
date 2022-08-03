const ServerStateService = require('../../state.services/serverStore');
const RoomsUpdateService = require('../update.services/roomsUpdate.service');

const roomInitializeConnectionHandler = (socket, data) => {
  const { connUserSocketId } = data;
  const initData = { connUserSocketId: socket.id };
  socket.to(connUserSocketId).emit('conn-init', initData);
};

module.exports = roomInitializeConnectionHandler;
