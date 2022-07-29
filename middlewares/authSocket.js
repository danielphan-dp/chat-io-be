const jwt = require('jsonwebtoken');
const config = process.env;

const verifyTokenSocket = (socket, next) => {
  // retrieve the token
  const token = socket.handshake.auth?.token;

  // verify the token
  try {
    const decodedToken = jwt.verify(token, config.TOKEN_KEY);
    socket.user = decodedToken;
  } catch (err) {
    const socketError = new Error('NOT_AUTHORIZED');
    return next(socketError);
  }

  // proceed to the next middleware
  next();
};

module.exports = verifyTokenSocket;
