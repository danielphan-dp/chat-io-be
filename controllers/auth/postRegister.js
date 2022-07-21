// -------------------
// | Database Access |
// -------------------
const User = require('../../models/user');

// --------------------
// | Encryption Tools |
// --------------------
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --------------------
// | Helper Functions |
// --------------------
// TODO: refactor to helper functions

// ----------------------------------
// | Register Account Functionality |
// ----------------------------------
const postRegister = async (req, res) => {
  try {
    // destructure information from user data
    const { username, mail, password } = req.body;

    // check and make sure that this is a new user
    const userExists = await User.exists({ mail: mail.toLowerCase() });
    if (userExists) {
      return res.status(409).send('E-mail already in use.');
    }

    // encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user document and save in database
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });

    // create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        mail: mail,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '24h',
      }
    );

    // send a response to the user
    res.status(201).json({
      userDetails: {
        mail: user.mail,
        token: token,
        username: user.username,
      },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send('Error occurred when registering user. Please try again.');
  }
};

module.exports = postRegister;
