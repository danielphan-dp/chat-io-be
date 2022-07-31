const ServerStateService = require('../../state.services/serverStore');
const UpdateService = require('../update.services');

const clientConnectHandler = async (socket) => {
  const userDetails = socket.user;
  ServerStateService.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });
  UpdateService.updateFriends({ userId: userDetails.userId });
  UpdateService.updateFriendsPendingInvitations({ userId: userDetails.userId });
};

module.exports = clientConnectHandler;
