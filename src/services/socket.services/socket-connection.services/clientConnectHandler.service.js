const ServerStateService = require('../../state.services/serverStore');
const UpdateService = require('../update.services');
const RoomsUpdateService = require('../update.services/roomsUpdate.service');

const clientConnectHandler = async (socket) => {
  const userDetails = socket.user;
  const { userId } = userDetails;
  ServerStateService.addClient(socket.id, userId);
  UpdateService.updateFriendsPendingInvitations(userId);
  UpdateService.updateFriends(userId);
  setTimeout(() => RoomsUpdateService.updateRooms(socket.id), [500]);
};

module.exports = clientConnectHandler;
