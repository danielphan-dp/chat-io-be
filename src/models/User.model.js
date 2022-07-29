const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  mail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
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
