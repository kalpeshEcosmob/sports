const Player = require('../model/player');
const Team = require('../model/team')
const Selected = require('../model/selected');
const Sequelize = require('sequelize');

exports.getTeams = async (req, res, next) => {
    try {
        const teams = await Team.findAll();
        res.json(teams)
    } catch (error) {
        res.json("Error while getting the teams data")
    }
}

exports.createTeam = async (req, res, next) => {

}

exports.updateTeam = async (req, res, next) => {
    try {
        const id = await req.body.id;
        const name = await req.body.name;

        await Team.update({
            teamName: name
        }, {
            where: { id: id }
        })
        res.redirect('/team')
    } catch (error) {
        console.log('Error updating the team', error)
        res.json("Error while updating the team")
    }
}

exports.deleteTeam = async (req, res, next) => {
    try {
        const id = req.body.id;
        await Team.destroy({ where: { id: id } });
        res.redirect('/team');
    } catch (error) {
        console.log('Error', error)
        res.json("Error while deleting a team")
    }
}

exports.selectedPlayer = async (req, res, next) => {
    try {
        const selected = await Selected.findAll();
        console.log('selected', selected)
        const selectedplayer = await selected.map(e => e.dataValues.PlayerId);
        res.json(selectedplayer);
    } catch (error) {
        res.json("Error while fetching the selected players ")
    }
}

exports.assignPlayer = async (req, res, next) => {
    try {
        /*======================getting data from the user============================= */
        /*======================team to add ...... gender required============================= */
        const TeamName = await req.body.team;
        const gender = await req.body.gender;

        /*=============================================================================*/
        /*==========================Checking wheather team has space for players===========*/

        const check = await Selected.findAll({ where: { TeamName: TeamName } });
        if (check.length > 6) throw error;

        const PlayerId = await check.map(e => e.PlayerId);
        const players = await [];
        for (i = 0; i < check.length; i++) {
            let value = await Player.findOne({ where: { id: PlayerId[i] } })
            players.push(value)
        }
        console.log('Players', players.map(e => e.dataValues.name))

        const totalMaleInTeam = await players.filter(e => e.dataValues.gender == "M");
        console.log('males', totalMaleInTeam.map(e => e.dataValues.name))
        const totalFemaleInTeam = await players.filter(e => e.dataValues.gender == "F");
        console.log('females', totalFemaleInTeam.map(e => e.dataValues.name))

        /*=============================================================================*/
        /*=============to find the player that are not in teams================*/
        /*=============================================================================*/

        const a = await Selected.findAll();
        const allPlayers = await Player.findAll();
        const selectedPlayers = [];

        for (i = 0; i < a.length; i++) {
            let value = await Player.findOne({ where: { id: a[i].dataValues.id } });
            selectedPlayers.push(value);
        }

        const c = selectedPlayers.map(e => e.id);

        const notinTeam = await allPlayers.filter(e => {
            if (!c.includes(e.id)) {
                return e;
            }
        })

        /*==selecting the male and female not in the teams players=============*/

        const malePlayers = await notinTeam.filter(e => {
            return e.dataValues.gender == "M"
        })

        const femalePlayers = await notinTeam.filter(e => {
            return e.dataValues.gender == "F"
        })

        if (gender === "M") {
            const single = await getRandomItem(malePlayers);
            // await Selected.create({
            //     TeamName: TeamName,
            //     PlayerId: single.id
            // })
            res.json({ Player: "Player added is", name: TeamName, Player: single.id })
        } else {
            const single = await getRandomItem(femalePlayers);
            // await Selected.create({
            //     TeamName: TeamName,
            //     PlayerId: single.id
            // })
            res.json({ name: TeamName, Player: single.id })
        }
    } catch (error) {
        console.log('Error', error)
        res.json('Error in assigning the player...!...Team has no space')
    }
}

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}