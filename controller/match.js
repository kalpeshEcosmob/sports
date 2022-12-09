const Team = require('../model/team');
const Match = require('../model/match');

exports.matchss = async (req, res, next) => {
    try {
        const teams = await Team.findAll();
        const teamA = await getRandomItem(teams);
        const winner = await teamA;
        removeItemOnce(teams, teamA);
        const teamB = await getRandomItem(teams);

        Match.create({
            team1: teamA.dataValues.id,
            team2: teamB.dataValues.id,
            winner: winner.dataValues.id,
            scheduled: Date()
        })

        const point = winner.dataValues.points + 2;

        await Team.update({
            points: point
        }, {
            where: { id: winner.dataValues.id }
        })
        res.json({ teams: teams, a: teamA })
    } catch (error) {
        res.json("Error in matching the players");
    }

}

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}