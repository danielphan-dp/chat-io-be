const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const bcrypt = require('bcryptjs');
const { generateToken } = require('./_utils/auth.utils');
const User = require('../../models/User.model');

// TODO: refactor to services
// const { authService, userService, tokenService, emailService } = require('../../services');

const postLogin = catchAsync(async (req, res) => {
  const { mail, password } = req.body;
  const user = await User.findOne({ mail: mail.toLowerCase() });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(httpStatus.BAD_REQUEST).send('Invalid credentials.');
  }
  const token = generateToken({
    userId: user._id,
    mail: mail,
  });
  return res.status(httpStatus.OK).json({
    // prettier-ignore
    userDetails: { // TODO: refactor to 'user'
        _id: user._id,
        mail: user.mail,
        username: user.username,
        token: token, // TODO: refactor to match front-end logic
      },
    token: token, // TODO: refactor to match front-end logic
  });
});

module.exports = postLogin;
