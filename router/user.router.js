const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');

// POST /api/users/registration
router.post('/registration', UserController.register);
router.post('/login', UserController.login);

router.post('/logout', UserController.logout);

module.exports = router;