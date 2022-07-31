const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.route');
const friendInvitationRoutes = require('./routes/friendInvitation.route');

// create Express app instance
const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// api routes
app.use('/api/auth', authRoutes);
app.use('/api/friend-invitation', friendInvitationRoutes);

module.exports = app;
