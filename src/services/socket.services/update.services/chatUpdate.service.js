const Conversation = require('../../../models/Conversation.model');
const ServerStateService = require('../../state.services/serverStore');

const updateChatHistory = async (conversationId, toSpecifiedSocketId = null) => {
  // db access
  const conversation = await Conversation.findById(conversationId).populate({
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'author',
      model: 'User',
      select: 'username _id',
    },
  });

  // assert
  if (!conversation) {
    return;
  }

  // initial update
  const io = ServerStateService.getSocketServerInstance();
  if (toSpecifiedSocketId) {
    return io.to(toSpecifiedSocketId).emit('direct-chat-history', {
      messages: conversation.messages,
      participants: conversation.participants,
    });
  }

  // notify other users
  conversation.participants.forEach((userId) => {
    const activeConnections = ServerStateService.getActiveConnections({
      userId: userId.toString(),
    });
    activeConnections.forEach((socketId) => {
      io.to(socketId).emit('direct-chat-history', {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    });
  });
};

module.exports = {
  updateChatHistory,
};
