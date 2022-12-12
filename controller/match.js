const Team = require('../model/team');
const Match = require('../model/match');
const m = require('moment');

exports.match = async (req, res, next) => {
    try {
        res.json("Nothing in the controller to process")

        /*==============================================================================*/

        // const teams = await Team.findAll();
        // const teamA = await getRandomItem(teams);
        // const winner = await teamA;
        // removeItemOnce(teams, teamA);
        // const teamB = await getRandomItem(teams);

        // Match.create({
        //     team1: teamA.dataValues.id,
        //     team2: teamB.dataValues.id,
        //     winner: winner.dataValues.id,
        //     scheduled: Date()
        // })

        /*=========================================================================*/
        //     const point = winner.dataValues.points + 2;

        //     await Team.update({
        //         points: point
        //     }, {
        //         where: { id: winner.dataValues.id }
        //     })
        //     res.json({ teams: teams, winner: teamA, loser: teamB })

        /*=========================================================================*/
    } catch (error) {
        res.json("Error in matching the players");
    }
}

exports.scheduleMatch = async (req, res, next) => {
    try {
        /* ============================getting data from the user====================== */

        const givenDate = await req.body.date;
        const givenHour = await req.body.hour;
        const givenMinute = await req.body.minute;

        let date = await m(givenDate).set("hour", givenHour).set("minute", givenMinute);

        const matchFixed = await Match.findAll();
        if (matchFixed.length > 0) {
            const t1 = await matchFixed.map(e => e.dataValues.team1);
            const t2 = await matchFixed.map(e => e.dataValues.team2);

            const t = [...t1, ...t2]
            let t3 = await [];
            let available = await Team.findAll();
            for (let x of t) {
                const value = await Team.findOne({ where: { id: x } });
                await t3.push(value)
            }

            const notinTeam = await available.filter(e => {
                if (!t.includes(e.dataValues.id.toString())) {
                    return e;
                }
            })

            if (notinTeam.length < 2) throw error;

            const teamA = await getRandomItem(notinTeam);
            const winner = await teamA;
            removeItemOnce(notinTeam, teamA);
            const teamB = await getRandomItem(notinTeam);

            Match.create({
                team1: teamA.dataValues.id,
                team2: teamB.dataValues.id,
                winner: winner.dataValues.id,
                scheduled: date
            })

            res.json({ Team: teamB })
        } else {

            const teams = await Team.findAll();
            const teamA = await getRandomItem(teams);
            const winner = await teamA;
            removeItemOnce(teams, teamA);
            const teamB = await getRandomItem(teams);

            const created = await Match.create({
                team1: teamA.dataValues.id,
                team2: teamB.dataValues.id,
                winner: winner.dataValues.id,
                scheduled: date
            })
            res.json(created)
        }
    } catch (error) {
        res.json('Cannot schedule the match at the given date and time')
    }
}

exports.point = async (req, res, next) => {
    try {
        const matches = await Match.findAll();

        if (matches.length == 0) throw error

        const winners = await matches.map(e => e.winner);

        for (let x of winners) {
            const winner = await Team.findOne({ where: { id: Number(x) } })
            point = await winner.dataValues.points + 2;
            await Team.update({
                points: point
            }, {
                where: { id: winner.dataValues.id }
            })
        }
        await Match.destroy({ where: {} })

        res.json("Points added to the teams")

    } catch (error) {
        res.json("Cannot add")
    }
}

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    if (randomIndex <= arr.length) {
        const item = arr[randomIndex];
        return item;
    } else {
        getRandomItem(arr)
    }
}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
}