module.exports = {
  // message
  getDirectChatHistoryHandler: require('./getDirectChatHistoryHandler.service'),
  sendDirectMessageHandler: require('./sendDirectMessageHandler.service'),

  // room
  roomCreateHandler: require('./roomCreateHandler.service'),
  roomJoinHandler: require('./roomJoinHandler.service'),
  roomLeaveHandler: require('./roomLeaveHandler.service'),

  roomInitializeConnectionHandler: require('./roomInitializeConnectionHandler.service'),
  roomSignalingDataHandler: require('./roomSignalingDataHandler.service'),
};
