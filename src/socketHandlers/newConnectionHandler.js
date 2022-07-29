const serverStore = require('../serverStore');
const friendsUpdate = require('./updates/friends');

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  // Cache the online user
  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  // INITIAL UPDATES
  friendsUpdate.updateFriends({ userId: userDetails.userId });
  friendsUpdate.updateFriendsPendingInvitations({ userId: userDetails.userId });
};

module.exports = newConnectionHandler;
