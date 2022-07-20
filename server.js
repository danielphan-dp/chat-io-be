const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');

// --------------------------------
// | Retrieve environment configs |
// --------------------------------
require('dotenv').config();

// ---------------------
// | Set up namespaces |
// ---------------------
const socketServer = require('./socketServer');
const authRoutes = require('./routes/authRoutes');

// --------------
// | PORT setup |
// --------------
// - process.env.PORT: used when hosted (provided by host)
// - process.env.API_PORT: used when running locally (specified in .env)
const PORT = process.env.PORT || process.env.API_PORT;

// ---------------------
// | Initialize server |
// ---------------------
function initializeServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use('/api/auth', authRoutes);
  return http.createServer(app);
}
const server = initializeServer();
socketServer.registerSocketServer(server);

// ---------------------------------
// | Set up MongoDB and run server |
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
