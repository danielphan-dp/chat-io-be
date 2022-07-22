const FriendInvitation = require('../../models/friendInvitation');
const User = require('../../models/user');
const friendsUpdates = require('../../socketHandlers/updates/friends');

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

const postAccept = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    // DATABASE UPDATE
    // remove invitation from friend pending list
    const invitation = await FriendInvitation.findById(id);
    if (!invitation) {
      return res.status(401).send('Error occurred. Please try again.');
    }

    // DATABASE UPDATE
    // add the users the friends list of one another
    // retrieve users from database
    const { senderId, receiverId } = invitation;
    const senderUser = await User.findById(senderId);
    const receiverUser = await User.findById(receiverId);

    // add users only when they are not already friends
    if (!usersAlreadyFriends(senderUser, receiverUser)) {
      senderUser.friends = [...senderUser.friends, receiverId];
      receiverUser.friends = [...receiverUser.friends, senderId];
      await senderUser.save();
      await receiverUser.save();
    }

    // DATABASE UPDATE
    // delete the invitations from the invitations database
    await FriendInvitation.findByIdAndDelete(id);

    // SENDING UPDATES TO ALL CONNECTED CLIENTS
    // update list of the friends if the users are online

    // update pending invitations
    friendsUpdates.updateFriendsPendingInvitations({
      userId: receiverId.toString(),
    });

    return res.status(200).send('Invitation successfully accepted!');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong. Please try again.');
  }
};

module.exports = postAccept;
