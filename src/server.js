const http = require('http');
const mongoose = require('mongoose');

// configs
require('dotenv').config();
const PORT = process.env.PORT || process.env.API_PORT;

// http server
const app = require('./app');
const server = http.createServer(app);

// socket server
// const socketServer = require('./socketServer');
// socketServer.registerSocketServer(server);

// start server upon successful MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connection established');
    server.listen(PORT, () => {
      console.log(`API server listening on PORT=${PORT}...`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection error. Something went wrong...');
    console.error(err);
  });
