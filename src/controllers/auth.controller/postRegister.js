const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const bcrypt = require('bcryptjs');
const { generateToken } = require('./_utils/auth.utils');
const User = require('../../models/User.model');

// TODO: refactor to services
// const { authService, userService, tokenService, emailService } = require('../../services');

const postRegister = catchAsync(async (req, res) => {
  const { mail, username, password } = req.body;
  if (await User.exists({ mail: mail.toLowerCase() })) {
    return res.status(httpStatus.CONFLICT).send('E-mail already in use.');
  }
  const user = await User.create({
    mail: mail.toLowerCase(),
    username: username,
    password: await bcrypt.hash(password, 10),
  });
  const token = generateToken({ userId: user._id, mail: mail });
  return res.status(httpStatus.CREATED).json({
    // prettier-ignore
    userDetails: { // TODO: refactor to 'user'
      _id: user._id,
      mail: user.mail,
      username: user.username,
			token: token, // TODO: refactor to match front-end logic
    },
    // token: token, // TODO: refactor to match front-end logic
  });
});

module.exports = postRegister;
