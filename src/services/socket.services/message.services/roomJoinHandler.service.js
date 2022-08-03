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

  // send information to users in room that they should prepare for incoming connection
  roomDetails.participants.forEach((participant) => {
    if (participant.socketId !== socketId) {
      socket.to(participant.socketId).emit('conn-prepare', {
        connUserSocketId: socketId,
      });
    }
  });

  RoomsUpdateService.updateRooms();
};

module.exports = roomJoinHandler;
