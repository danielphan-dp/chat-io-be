const Message = require('../../../models/Message.model');
const Conversation = require('../../../models/Conversation.model');
const UpdateService = require('../update.services');

const sendDirectMessageHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId, content } = data;

    // db update
    const message = await Message.create({
      content: content,
      author: userId,
      date: new Date(),
      type: 'DIRECT',
    });

    // db update
    let conversation = await Conversation.findOne({
      participants: {
        $all: [userId, receiverUserId],
      },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        messages: [message._id],
        participants: [userId, receiverUserId],
      });
    } else {
      conversation.messages.push(message._id);
      await conversation.save();
    }
    UpdateService.updateChatHistory(conversation._id.toString());
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendDirectMessageHandler;
