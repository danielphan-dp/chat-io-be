const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
  },
  mail: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  friends: [
    {
      type: Schema.Types.Object,
      ref: 'User',
    },
  ],
});

/**
 * @typedef User
 */
const User = mongoose.model('User', UserSchema);

module.exports = User;
