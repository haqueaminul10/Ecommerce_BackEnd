const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

//REGISTER ROUTER
router.post('/register', authController.register);

//LOGIN ROUTER
router.post('/login', authMiddleware.requireLogin, authController.logIn);

module.exports = router;
