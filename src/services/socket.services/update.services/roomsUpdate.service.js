const ServerStateService = require('../../state.services/serverStore');

const updateRooms = (toSpecifiedSocketId = null) => {
  const io = ServerStateService.getIo();
  const activeRooms = ServerStateService.getActiveRooms();
  if (toSpecifiedSocketId) {
    io.to(toSpecifiedSocketId).emit('active-rooms', { activeRooms });
  } else {
    io.emit('active-rooms', { activeRooms });
  }
};

module.exports = {
  updateRooms,
};
