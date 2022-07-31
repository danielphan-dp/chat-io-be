const initializeIoServer = require('./initializeIoServer.service');
const setUpIoServerLogic = require('./setUpIoServerLogic.service');

module.exports = {
  registerSocketServer: (server) => {
    initializeIoServer(server);
    setUpIoServerLogic();
  },
};
