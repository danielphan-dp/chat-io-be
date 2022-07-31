const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['authorization'];
  if (!token) {
    return res.status(httpStatus.FORBIDDEN).send('No token received.');
  }
  try {
    req.user = jwt.verify(token.replace(/^Bearer\s+/, ''), process.env.TOKEN_KEY);
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED).send('Invalid Token.');
  }
  return next();
};

module.exports = {
  verifyToken,
};
