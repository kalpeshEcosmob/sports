const express = require('express');
const router = express.Router();
const playerController = require('../controller/player');
const isAuth = require('../middleware/is-auth').getauth;

router.get('/', isAuth, playerController.getPlayer)

router.post('/addPlayer', isAuth, playerController.postPlayer)

router.patch('/updatePlayer', isAuth, playerController.updatePlayer)

router.delete('/deletePlayer', isAuth, playerController.deletePlayer)

module.exports = router;
