const User = require('../../models/User.model');
const FriendInvitation = require('../../models/FriendInvitation.model');
const FriendsUpdateService = require('../../services/socket.services/update.services/friendsUpdate.service');

const isFriend = (user1, user2) => {
  for (var i = 0; i < user1.friends.length; ++i) {
    const u1id = user1.friends[i]._id.toString();
    const u2id = user2.id;
    if (u1id === u2id) {
      return true;
    }
  }
  return false;
};

const usersAlreadyFriends = (user1, user2) => {
  return isFriend(user1, user2) && isFriend(user2, user1);
};

// TODO: refactor to using catch async
const postAccept = async (req, res) => {
  try {
    const { body: id, user: userId } = req;

    // db update
    const invitation = await FriendInvitation.findById(id);
    if (!invitation) {
      return res.status(401).send('Error occurred. Please try again.');
    }

    // db update
    const { senderId, receiverId } = invitation;
    const senderUser = await User.findById(senderId);
    const receiverUser = await User.findById(receiverId);
    if (!usersAlreadyFriends(senderUser, receiverUser)) {
      senderUser.friends = [...senderUser.friends, receiverId];
      receiverUser.friends = [...receiverUser.friends, senderId];
      await senderUser.save();
      await receiverUser.save();
    }

    // db update
    await FriendInvitation.findByIdAndDelete(id);

    // socket update (to all connected clients)
    FriendsUpdateService.updateFriends({
      userId: senderId.toString(),
    });
    FriendsUpdateService.updateFriends({
      userId: receiverId.toString(),
    });
    FriendsUpdateService.updateFriendsPendingInvitations({
      userId: receiverId.toString(),
    });

    // notify client
    return res.status(200).send('Invitation successfully accepted!');
  } catch (err) {
    return res.status(500).send('Something went wrong. Please try again.');
  }
};

module.exports = postAccept;
