const User = require('../../models/User.model');
const FriendInvitation = require('../../models/FriendInvitation.model');
const FriendsUpdateService = require('../../services/socket.services/update.services/friendsUpdate.service');

const isFriend = (user1, user2) => {
  for (var i = 0; i < user1.friends.length; ++i) {
    if (user1.friends[i]._id.toString() === user2.id) return true;
  }
  return false;
};

const usersAlreadyFriends = (user1, user2) => isFriend(user1, user2) && isFriend(user2, user1);

// TODO: refactor to using catch async
const postAccept = async (req, res) => {
  try {
    const {
      body: { id },
      user: { userId },
    } = req;

    // db
    const invitation = await FriendInvitation.findById(id);
    if (!invitation) return res.status(401).send('Error occurred. Please try again.');

    // db
    const { senderId, receiverId } = invitation;
    const senderUser = await User.findById(senderId);
    const receiverUser = await User.findById(receiverId);
    if (!usersAlreadyFriends(senderUser, receiverUser)) {
      senderUser.friends = [...senderUser.friends, receiverId];
      receiverUser.friends = [...receiverUser.friends, senderId];
      await senderUser.save();
      await receiverUser.save();
    }

    // db
    await FriendInvitation.findByIdAndDelete(id);

    // socket update
    FriendsUpdateService.updateFriends(senderId.toString());
    FriendsUpdateService.updateFriends(receiverId.toString());
    FriendsUpdateService.updateFriendsPendingInvitations(receiverId.toString());

    // api response
    return res.status(200).send('Invitation successfully accepted!');
  } catch (err) {
    return res.status(500).send('Something went wrong. Please try again.');
  }
};

module.exports = postAccept;
