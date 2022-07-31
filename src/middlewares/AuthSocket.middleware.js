const jwt = require('jsonwebtoken');

const verifyTokenSocket = (socket, next) => {
  try {
    socket.user = jwt.verify(socket.handshake.auth?.token, process.env.TOKEN_KEY);
  } catch (err) {
    return next(new Error('NOT_AUTHORIZED'));
  }
  next();
};

module.exports = {
  verifyTokenSocket,
};
