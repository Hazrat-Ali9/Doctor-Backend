// auth route
const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/authControllers');
const { validateLogin } = require('../middlewares/validateLogin');
const { validateSignup } = require('../middlewares/validateSignup');
// @route   POST /api/auth/login
// @desc    Login user and get token
// @access  Public
router.post('/login', validateLogin, login);
router.post('/signup', validateSignup, signup);
module.exports = router;
