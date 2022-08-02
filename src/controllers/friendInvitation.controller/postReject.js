const httpStatus = require('http-status');
const FriendInvitation = require('../../models/FriendInvitation.model');
const FriendsUpdateService = require('../../services/socket.services/update.services/friendsUpdate.service');

const postReject = async (req, res) => {
  try {
    const {
      body: { id },
      user: { userId },
    } = req;
    if (await FriendInvitation.exists({ _id: id })) {
      await FriendInvitation.findByIdAndDelete(id);
    }
    FriendsUpdateService.updateFriendsPendingInvitations(userId);
    return res.status(httpStatus.OK).send('Friend invitation rejected.');
  } catch (err) {
    return res.status(httpStatus.InternalServerError).send('Something went wrong. Please try again.');
  }
};

module.exports = postReject;
