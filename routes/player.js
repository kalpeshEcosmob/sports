const express = require('express');
const router = express.Router();
const playerController = require('../controller/player');
const isAuth = require('../middleware/is-auth').getauth;

router.get('/', playerController.getPlayer)

router.post('/addPlayer', playerController.postPlayer)

router.patch('/updatePlayer', playerController.updatePlayer)

router.delete('/deletePlayer', playerController.deletePlayer)

module.exports = router;
