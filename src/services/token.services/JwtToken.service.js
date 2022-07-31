const jwt = require('jsonwebtoken');

const generateToken = (payload = {}, secretKey = process.env.TOKEN_KEY, options = { expiresIn: '24h' }) => {
  return jwt.sign(payload, secretKey, options);
};

module.exports = {
  generateToken,
};
