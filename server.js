const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// --------------
// | PORT setup |
// --------------
// - process.env.PORT: used when hosted (provided by host)
// - process.env.API_PORT: used when running locally (specified in .env)
const PORT = process.env.PORT || process.env.API_PORT;

// -------------------------
// | Set up and run server |
// -------------------------
function initializeServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  return http.createServer(app);
}

const server = initializeServer();
server.listen(PORT, () => {
  console.log(`Server is listening on PORT=${PORT}...`);
});
