const ServerStateService = require('../../state.services/serverStore');
const RoomsUpdateService = require('../update.services/roomsUpdate.service');

const roomJoinHandler = (socket, data) => {
  const {
    id: socketId,
    user: { userId },
  } = socket;
  const { roomId } = data;
  const roomDetails = ServerStateService.getActiveRoom(roomId);
  ServerStateService.joinActiveRoom(roomId, { userId, socketId });
  RoomsUpdateService.updateRooms();
};

module.exports = roomJoinHandler;
