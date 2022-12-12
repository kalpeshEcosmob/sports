const express = require('express');
const router = express.Router();
const matchController = require('../controller/match');
const isAuth = require('../middleware/is-auth').getauth;

router.get('/match', matchController.match);

router.post('/point', matchController.point);

router.post('/schedule', matchController.scheduleMatch)

module.exports = router;