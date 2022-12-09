const express = require('express');
const router = express.Router();
const matchController = require('../controller/match');
const isAuth = require('../middleware/is-auth').getauth;

router.get('/match', matchController.matchss);

module.exports = router;