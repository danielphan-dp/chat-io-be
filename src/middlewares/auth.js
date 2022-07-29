const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['authorization'];
  if (!token) {
    return res.status(httpStatus.FORBIDDEN).send('No token received.');
  }
  try {
    const decodedToken = jwt.verify(token.replace(/^Bearer\s+/, ''), process.env.TOKEN_KEY);
    req.user = decodedToken;
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED).send('Invalid Token.');
  }
  return next();
};

module.exports = verifyToken;
