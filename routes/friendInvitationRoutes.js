// --------------------------
// | Libraries and Packages |
// --------------------------
// Express Core Functionalities
const express = require('express');
const router = express.Router();

// Friend Invitation Functionalities
const friendInvitationControllers = require('../controllers/friendInvitation/friendInvitationControllers');

// User Inputs Validation Functionalities
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

// Authentication Middleware
const auth = require('../middleware/auth');

// -----------
// | Schemas |
// -----------
const postFriendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email().required(),
});

// ----------
// | Routes |
// ----------
router.post(
  '/invite',
  auth,
  validator.body(postFriendInvitationSchema),
  friendInvitationControllers.controllers.postInvite
);

module.exports = router;
