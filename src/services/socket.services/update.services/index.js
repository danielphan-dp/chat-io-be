const { updateChatHistory } = require('./chatUpdate.service');
const { updateFriendsPendingInvitations, updateFriends } = require('./friendsUpdate.service');

module.exports = {
  updateChatHistory,
  updateFriendsPendingInvitations,
  updateFriends,
};
