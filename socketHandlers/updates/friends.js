const User = require('../../models/User.model');
const FriendInvitation = require('../../models/FriendInvitation.model');
const serverStore = require('../../serverStore');

const updateFriendsPendingInvitations = async ({ userId }) => {
  try {
    // find all the users that need to be notified
    // stop processing if there is no user
    const receiverList = serverStore.getActiveConnections({ userId });
    if (receiverList.length === 0) {
      return;
    }

    // connect with database and query the pending invitations
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate('senderId', '_id username mail');

    // LOG: remove when finished testing
    // console.log('RECEIVER LIST');
    // console.log(receiverList);

    // emit to all connected clients about the friend invitation
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

const updateFriends = async ({ userId }) => {
  try {
    // find all the users that need to be notified
    // stop processing if there is no user
    const receiverList = serverStore.getActiveConnections({ userId });
    if (receiverList.length === 0) {
      return;
    }

    // connect with database and query the current user
    const user = await User.findById(userId, {
      _id: 1,
      friends: 1,
    }).populate('friends', '_id username mail');

    // update
    if (user) {
      // retrieve the friends list
      const friendsList = user.friends.map((f) => {
        return {
          id: f._id,
          mail: f.mail,
          username: f.username,
        };
      });

      // LOG: remove when finished testing
      console.log('RECEIVER LIST');
      console.log(receiverList);

      // emit to all connected clients about the friend list
      const io = serverStore.getSocketServerInstance();
      receiverList.forEach((receiverSocketId) => {
        io.to(receiverSocketId).emit('friends-list', {
          friends: friendsList ? friendsList : [],
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  updateFriendsPendingInvitations,
  updateFriends,
};
