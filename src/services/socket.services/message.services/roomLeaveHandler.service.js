const ServerStateService = require('../../state.services/serverStore');
const RoomsUpdateService = require('../update.services/roomsUpdate.service');

const roomLeaveHandler = (socket, data) => {
  const {
    id: socketId,
    user: { userId },
  } = socket;
  const { roomId } = data;
  const activeRoom = ServerStateService.getActiveRoom(roomId);
  if (activeRoom) {
    ServerStateService.leaveActiveRoom(roomId, socket.id);
    RoomsUpdateService.updateRooms();
  }
};

module.exports = roomLeaveHandler;
