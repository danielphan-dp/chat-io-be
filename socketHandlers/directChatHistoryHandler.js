const Conversation = require('../models/Conversation.model');
const chatUpdates = require('./updates/chat');

const directChatHistoryHandler = async (socket, data) => {
  console.log('DIRECT CHAT HISTORY HANDLER');

  try {
    const { userId } = socket.user;
    const { receiverUserId } = data;

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
      type: 'DIRECT',
    });

    console.log(' ----------- DIRECT CHAT HISTORY HANDLER');

    if (conversation) {
      chatUpdates.updateChatHistory(conversation._id.toString(), socket.id);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = directChatHistoryHandler;
