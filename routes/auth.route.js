const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');

//REGISTER ROUTER
router.post('/register', authController.register);

module.exports = router;
