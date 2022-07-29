const jwt = require('jsonwebtoken');

const defaultKey = process.env.TOKEN_KEY;
const defaultOptions = { expiresIn: '24h' };

const generateToken = (payload, secretKey = defaultKey, options = defaultOptions) => {
  return jwt.sign(payload, secretKey, options);
};

module.exports = {
  generateToken,
};
