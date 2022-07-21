const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');
const serverStore = require('../../serverStore');

const updateFriendsPendingInvitations = async ({ userId }) => {
  try {
    // connect with database and query the pending invitations
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate('senderId', '_id username mail');

    // find all active connections of specific userId
    const receiverList = serverStore.getActiveConnections({ userId });

    // TODO: remove when finished testing
    console.log('RECEIVER LIST');
    console.log(receiverList);

    // emit to all connected clients about the friend invitation

    // TODO: remove when finished testing
    console.log('SENDING TO ALL CLIENTS');

    const io = serverStore.getSocketServerInstance();
    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit('friends-invitations', {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  updateFriendsPendingInvitations,
};
