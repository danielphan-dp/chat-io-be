const User = require('../../models/User.model');
const FriendInvitation = require('../../models/FriendInvitation.model');
const FriendsUpdateService = require('../../services/socket.services/update.services/friendsUpdate.service');

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;
  const { userId, mail } = req.user;

  // check if friend that we would like to invite is not user
  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res.status(409).send('Sorry. You cannot send a friend request to yourself.');
  }

  // check if user not exist
  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });

  if (!targetUser) {
    return res.status(404).send(`User with email ${targetMailAddress} not found. Please check mail address.`);
  }

  // check if invitation has already been sent
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send(`Friend invitation has already been sent to user with e-mail ${targetMailAddress}.`);
  }

  // check if the sending user and the target users are already friends
  const usersAlreadyFriends = targetUser.friends.find((friendId) => friendId.toString() === userId.toString());

  if (usersAlreadyFriends) {
    return res.status(409).send('Friend already added. Please check friends list.');
  }

  // create and save the new invitation in database
  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  // update friends invitations if other user is online
  FriendsUpdateService.updateFriendsPendingInvitations({
    userId: targetUser._id.toString(),
  });

  return res.status(201).send('Invitation has been sent!');
};

module.exports = postInvite;
