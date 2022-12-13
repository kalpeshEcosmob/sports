const express = require('express');
const router = express.Router();
const matchController = require('../controller/match');
const isAuth = require('../middleware/is-auth').getauth;

router.post('/point', matchController.point);

router.post('/match', matchController.match)

module.exports = router;