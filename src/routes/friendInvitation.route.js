const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const auth = require('../middlewares/auth');
const { sendTestSuccessMessage } = require('./_utils/utils.test');

const router = express.Router();
const friendInvitationController = require('../controllers/friendInvitation.controller');

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

router.post('/invite', auth, validator.body(postFriendInvitationSchema), friendInvitationController.postInvite);
router.post('/accept', auth, validator.body(inviteDecisionSchema), friendInvitationController.postAccept);
router.post('/reject', auth, validator.body(rejectDecisionSchema), friendInvitationController.postReject);
router.get('/test-auth', auth, sendTestSuccessMessage);

module.exports = router;
