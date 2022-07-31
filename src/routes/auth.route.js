const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const { sendTestSuccessMessage } = require('./_utils/utils.test');

const router = express.Router();
const authController = require('../controllers/Auth.controller');
const auth = require('../middlewares/Auth.middleware');

// prettier-ignore
const registerSchema = Joi.object({
  username: Joi.string()
		.min(3)
		.max(15)
		.required(),
	mail: Joi.string()
		.email()
		.required(),
  password: Joi.string()
    .min(6)
    .max(30)
    // .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'))
    .required(),
});

// prettier-ignore
const loginSchema = Joi.object({
	mail: Joi.string()
		.email()
		.required(),
  password: Joi.string()
		.min(6)
		.max(30)
		// .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'))
		.required(),
});

router.post('/register', validator.body(registerSchema), authController.postRegister);
router.post('/login', validator.body(loginSchema), authController.postLogin);
router.get('/test-auth', auth.verifyToken, sendTestSuccessMessage);

module.exports = router;
