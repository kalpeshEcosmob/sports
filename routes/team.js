const express = require('express');
const router = express.Router();
const teamController = require('../controller/team');
const isAuth = require('../middleware/is-auth').getauth;

router.get('/teams', teamController.getTeams)

router.post('/createTeam', teamController.createTeam)

router.patch('/updateTeam', teamController.updateTeam)

router.delete('/deleteTeam', teamController.deleteTeam)

router.get('/assign',teamController.assignPlayer);

module.exports = router;