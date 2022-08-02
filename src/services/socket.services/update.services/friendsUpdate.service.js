const User = require('../../../models/User.model');
const FriendInvitation = require('../../../models/FriendInvitation.model');
const ServerStateService = require('../../state.services/serverStore');

// TODO: refactor to using catch async
const updateFriendsPendingInvitations = async (userId) => {
  try {
    const receiverList = ServerStateService.getActiveClientsOfUser(userId);
    if (receiverList.length === 0) return;

    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate('senderId', '_id username mail');

    const io = ServerStateService.getIo();
    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit('friends-invitations', {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (err) {
    console.log(err);
  }
};

// TODO: refactor to using catch async
const updateFriends = async (userId) => {
  try {
    const receiverList = ServerStateService.getActiveClientsOfUser(userId);
    if (receiverList.length === 0) {
      return;
    }

    const user = await User.findById(userId, {
      _id: 1,
      friends: 1,
    }).populate('friends', '_id username mail');

    if (!user) {
      return;
    }

    const friendsList = user.friends.map((f) => {
      return {
        id: f._id,
        mail: f.mail,
        username: f.username,
      };
    });

    const io = ServerStateService.getIo();
    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit('friends-list', {
        friends: friendsList ? friendsList : [],
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  updateFriendsPendingInvitations,
  updateFriends,
};
