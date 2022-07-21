const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');

// --------------------------------
// | Retrieve Environment Configs |
// --------------------------------
require('dotenv').config();

// ----------------------------
// | Retrieve SocketIO Server |
// ----------------------------
const socketServer = require('./socketServer');

// -----------------------
// | Retrieve All Routes |
// -----------------------
const authRoutes = require('./routes/authRoutes');
const friendInvitationRoutes = require('./routes/friendInvitationRoutes');

// --------------
// | PORT Setup |
// --------------
// - process.env.PORT: used when hosted (provided by host)
// - process.env.API_PORT: used when running locally (specified in .env)
const PORT = process.env.PORT || process.env.API_PORT;

// ---------------------
// | Initialize Server |
// ---------------------
function initializeServer() {
  // initialize express application
  const app = express();
  app.use(express.json());
  app.use(cors());

  // add routes
  app.use('/api/auth', authRoutes);
  app.use('/api/friend-invitation', friendInvitationRoutes);

  // create and return the server
  return http.createServer(app);
}

const server = initializeServer();
socketServer.registerSocketServer(server);

// ---------------------------------
// | Set up MongoDB and Run Server |
// ---------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log('Database connection successful. Server is starting...');
      console.log(`Server is listening on PORT=${PORT}...`);
    });
  })
  .catch((err) => {
    console.log('Database connection failed. Server not started.');
    console.error(err);
  });
