const ServerStateService = require('../../state.services/serverStore');
const RoomsUpdateService = require('../update.services/roomsUpdate.service');

const roomLeaveHandler = (socket, data) => {
  const { roomId } = data;
  let activeRoom = ServerStateService.getActiveRoom(roomId);

  if (!activeRoom) return;

  ServerStateService.leaveActiveRoom(roomId, socket.id);
  activeRoom = ServerStateService.getActiveRoom(roomId);
  if (activeRoom) {
    activeRoom.participants.forEach((participant) => {
      socket.to(participant.socketId).emit('room-participant-left', {
        connUserSocketId: socket.id,
      });
    });
  }

  RoomsUpdateService.updateRooms();
};

module.exports = roomLeaveHandler;
