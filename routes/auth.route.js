const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');

//REGISTER ROUTER
router.post('/register', authController.register);

//LOGIN ROUTER
router.post('/login', authController.logIn);

module.exports = router;
