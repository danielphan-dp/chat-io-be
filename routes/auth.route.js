const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const auth = require('../middlewares/auth');
const { sendTestSuccessMessage } = require('./_utils/utils.test');

const router = express.Router();
const authController = require('../controllers/auth.controller');

// prettier-ignore
const registerSchema = Joi.object({
  username: Joi.string()
		.min(3)
		.max(12)
		.required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'))
    .required(),
  mail: Joi.string()
		.email()
		.required(),
});

// prettier-ignore
const loginSchema = Joi.object({
  password: Joi.string()
		.min(6)
		.max(12)
		.required(),
  mail: Joi.string()
		.email()
		.required(),
});

router.post('/register', validator.body(registerSchema), authController.postRegister);
router.post('/login', validator.body(loginSchema), authController.postLogin);
router.get('/test-auth', auth, sendTestSuccessMessage);

module.exports = router;
