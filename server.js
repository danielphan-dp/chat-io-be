const http = require('http');
const mongoose = require('mongoose');

// Express app
const app = require('./app');

// environment variables
require('dotenv').config();

// port setup
const PORT = process.env.PORT || process.env.API_PORT;

// api server
const server = http.createServer(app);

// socket server
const socketServer = require('./socketServer');
socketServer.registerSocketServer(server);

// start server upon success MongoDB connection
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
