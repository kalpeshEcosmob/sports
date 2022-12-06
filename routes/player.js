const express = require('express');
const router = express.Router();
const playerController = require('../controller/player');
const Player = require('../util/database')

router.get('/',playerController.getPlayer)

router.post('/addPlayer',playerController.postPlayer)

module.exports = router;
