const mongoose = require('mongoose');
const { Schema } = mongoose;

const FriendInvitationSchema = new mongoose.Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

/**
 * @typedef FriendInvitation
 */
const FriendInvitation = mongoose.model('FriendInvitation', FriendInvitationSchema);

module.exports = FriendInvitation;
