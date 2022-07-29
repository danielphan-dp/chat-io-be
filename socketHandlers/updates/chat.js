const Conversation = require('../../models/Conversation.model');
const serverStore = require('../../serverStore');

const updateChatHistory = async (conversationId, toSpecifiedSocketId = null) => {
  console.log('--------- updating chat history');

  const conversation = await Conversation.findById(conversationId).populate({
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'author',
      model: 'User',
      select: 'username _id',
    },
  });

  console.log('--------- updating chat history ------------------');

  if (conversation) {
    const io = serverStore.getSocketServerInstance();

    if (toSpecifiedSocketId) {
      // initial update of chat history
      return io.to(toSpecifiedSocketId).emit('direct-chat-history', {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    }

    console.log('--------- updating chat history ------------------');

    // check if users of this conversation are online
    // if yes, emit ot them update of messages
    conversation.participants.forEach((userId) => {
      const activeConnections = serverStore.getActiveConnections({
        userId: userId.toString(),
      });

      console.log(activeConnections);

      activeConnections.forEach((socketId) => {
        io.to(socketId).emit('direct-chat-history', {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  }
};

module.exports = {
  updateChatHistory,
};
