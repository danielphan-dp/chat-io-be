const jwt = require('jsonwebtoken');

const config = process.env;

const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;
  try {
    const decodedToken = jwt.verify(token, config.TOKEN_KEY);
    socket.user = decodedToken;
  } catch (err) {
    const socketError = new Error('NOT_AUTHORIZED');
    return next(socketError);
  }
  next();
};

module.exports = verifyTokenSocket;
