const express = require('express');
const router = express.Router();
const teamController = require('../controller/team');
const isAuth = require('../middleware/is-auth').getauth;

router.get('/teams', teamController.getTeams)

router.patch('/updateTeam', teamController.updateTeam)

router.delete('/deleteTeam', teamController.deleteTeam)

router.get('/assign', teamController.assignPlayer);

router.get('/selected', teamController.selectedPlayer)

module.exports = router;