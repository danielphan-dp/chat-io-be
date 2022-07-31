const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
  },
  type: {
    type: String,
  },
});

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
