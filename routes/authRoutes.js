const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth/authControllers');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const auth = require('../middleware/auth');

// Create schemas that specify allowed user data
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

// Register routes to the router
router.post(
  '/register',
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);

router.post(
  '/login',
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);

// test route to verify if authentication middleware is working
router.get('/test', auth, (req, res) => {
  res.send('token authentication request passed');
});

module.exports = router;
