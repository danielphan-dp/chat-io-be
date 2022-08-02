const ServerStateService = require('../../state.services/serverStore');
const RoomsUpdateService = require('../update.services/roomsUpdate.service');

const roomCreateHandler = (socket) => {
  const {
    id: socketId,
    user: { userId },
  } = socket;
  const roomDetails = ServerStateService.addRoom(userId, socketId);
  socket.emit('room-create', { roomDetails });
  RoomsUpdateService.updateRooms();
};

module.exports = roomCreateHandler;
