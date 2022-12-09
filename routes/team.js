const express = require('express');
const router = express.Router();
const teamController = require('../controller/team');
const isAuth = require('../middleware/is-auth').getauth;

router.get('/teams', isAuth, teamController.getTeams)

router.patch('/updateTeam', isAuth, teamController.updateTeam)

router.delete('/deleteTeam', isAuth, teamController.deleteTeam)

router.get('/assign', isAuth, teamController.assignPlayer);

router.get('/selected', isAuth, teamController.selectedPlayer)

module.exports = router;