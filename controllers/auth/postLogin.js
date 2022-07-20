const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postLogin = async (req, res) => {
  try {
    // destructure information from user data
    const { mail, password } = req.body;

    // connect to database and retrieve user information
    const user = await User.findOne({ mail: mail.toLowerCase() });

    // verify is the entered password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      // create new jwt token
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

      // inform the success login to the user
      return res.status(200).json({
        userDetails: {
          mail: user.mail,
          token: token,
          username: user.username,
        },
      });
    }

    // TODO: remove log when finish testing
    console.log('user entered invalid credentials');

    // user entered invalid information
    return res.status(400).send('Invalid credentials. Please try again.');
  } catch (err) {
    // TODO: remove log when finish testing
    console.log(err);

    return res.status(500).send('Something went wrong. Please try again.');
  }
};

module.exports = postLogin;
