const Player = require('../model/player');
const Team = require('../model/team')

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

    } catch (error) {
        res.json("Error while fetching the selected players ")
    }
}

exports.assignPlayer = async (req, res, next) => {
    try {
        const players = await Player.findAll();
        const data = await players.map(e => e.dataValues.id);
        const singlePlayer = await getRandomItem(data);
        await console.log('single Player', singlePlayer)
        res.json(singlePlayer)
    } catch (error) {

    }
}

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}