const Conversation = require('../../../models/Conversation.model');
const UpdateService = require('../update.services');

const getDirectChatHistoryHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId } = data;
    const conversation = await Conversation.findOne({
      participants: {
        $all: [userId, receiverUserId],
      },
      type: 'DIRECT',
    });
    conversation && UpdateService.updateChatHistory(conversation._id.toString(), socket.id);
  } catch (err) {
    console.log(err);
  }
};

module.exports = getDirectChatHistoryHandler;
