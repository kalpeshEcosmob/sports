const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.post('/login', userController.postLogin)

router.post('/signup', userController.postSignin)

module.exports = router;