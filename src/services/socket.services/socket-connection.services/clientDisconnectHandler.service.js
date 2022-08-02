const ServerStateService = require('../../state.services/serverStore');
const MessageService = require('../message.services');

const clientDisconnectHandler = (socket) => {
  const activeRooms = ServerStateService.getActiveRooms();
  activeRooms.forEach((activeRoom) => {
    const userInRoom = activeRoom.participants.some((participant) => participant.socketId === socket.id);
    if (userInRoom) {
      MessageService.roomLeaveHandler(socket, { roomId: activeRoom.roomId });
    }
  });
  ServerStateService.removeClient({ socketId: socket.id });
};

module.exports = clientDisconnectHandler;
