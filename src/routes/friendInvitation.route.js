const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { sendTestSuccessMessage } = require('./_utils/utils.test');

const router = express.Router();
const friendInvitationController = require('../controllers/FriendInvitation.controller');
const auth = require('../middlewares/Auth.middleware');

// prettier-ignore
const postFriendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string()
		.email()
		.required(),
});

// prettier-ignore
const inviteDecisionSchema = Joi.object({
  id: Joi.string()
		.required(),
});

// prettier-ignore
const rejectDecisionSchema = Joi.object({
  id: Joi.string()
		.required(),
});

router.post('/invite', auth.verifyToken, validator.body(postFriendInvitationSchema), friendInvitationController.postInvite);
router.post('/accept', auth.verifyToken, validator.body(inviteDecisionSchema), friendInvitationController.postAccept);
router.post('/reject', auth.verifyToken, validator.body(rejectDecisionSchema), friendInvitationController.postReject);
router.get('/test-auth', auth.verifyToken, sendTestSuccessMessage);

module.exports = router;
