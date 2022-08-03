const ServerStateService = require('../state.services/serverStore');
const SocketConnectionService = require('../socket.services/socket-connection.services');
const MessageService = require('../socket.services/message.services');
const AuthSocketMiddleware = require('../../middlewares/AuthSocket.middleware');

const setUpIoServerLogic = () => {
  const io = ServerStateService.getIo();
  io.use((socket, next) => AuthSocketMiddleware.verifyTokenSocket(socket, next));
  io.on('connection', (socket) => {
    // initial actions when the user first connects to the server
    SocketConnectionService.clientConnectHandler(socket);
    SocketConnectionService.emitOnlineUsers(io);

    // socket signals
    socket.on('direct-message', (data) => {
      MessageService.sendDirectMessageHandler(socket, data);
    });

    socket.on('direct-chat-history', (data) => {
      MessageService.getDirectChatHistoryHandler(socket, data);
    });

    socket.on('room-create', () => {
      MessageService.roomCreateHandler(socket);
    });

    socket.on('room-join', (data) => {
      MessageService.roomJoinHandler(socket, data);
    });

    socket.on('room-leave', (data) => {
      MessageService.roomLeaveHandler(socket, data);
    });

    socket.on('conn-init', (data) => {
      MessageService.roomInitializeConnectionHandler(socket, data);
    });

    socket.on('conn-signal', (data) => {
      MessageService.roomSignalingDataHandler(socket, data);
    });

    socket.on('disconnect', () => {
      SocketConnectionService.clientDisconnectHandler(socket);
    });
  });
  SocketConnectionService.emitOnlineUsersWithPolling(io, 60 * 1000);
};

module.exports = setUpIoServerLogic;
