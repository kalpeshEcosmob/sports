const Player = require('../model/player');
const Team = require('../model/team')
const Selected = require('../model/selected');

exports.getTeams = async (req, res, next) => {
    try {
        const teams = await Team.findAll();
        res.json(teams)
    } catch (error) {
        res.json("Error while getting the teams data")
    }
}

exports.updateTeam = async (req, res, next) => {
    try {
        const TeamId = await req.body.TeamId;
        const newTeamName = await req.body.newTeamName;

        const teamToChange = await Team.findOne({ where: { id: TeamId } })
        const teamIdToChange = await teamToChange.dataValues.id;

        await Team.update({
            teamName: newTeamName
        }, {
            where: { id: teamIdToChange }
        })

        res.redirect('/teams')

    } catch (error) {
        console.log('Error updating the team', error)
        res.json("Error while updating the team")
    }
}

exports.deleteTeam = async (req, res, next) => {
    try {
        const TeamId = await req.body.TeamId;

        /* ===========================================================================*/
        /* ==================== if want to change the captain to no =================*/

        // const teamData = await Selected.findAll({ where: { TeamName: TeamName } })
        // const valueReq = await teamData.map(e => e.dataValues.PlayerId)

        // for (i = 0; i < valueReq.length; i++) {
        //     const data = await Player.findOne({ where: { id: valueReq[i], captain: "Yes" } })
        //     if (data != null) {
        //         await Player.update({
        //             captain: "No"
        //         }, {
        //             where: { id: valueReq[i] }
        //         })
        //     }
        // }
        /* ===========================================================================*/

        await Team.destroy({ where: { id: TeamId } });
        await Selected.destroy({ where: { TeamId: TeamId } });
        res.redirect('/teams');
    } catch (error) {
        console.log('Error', error)
        res.json("Error while deleting a team")
    }
}

exports.selectedPlayer = async (req, res, next) => {
    try {
        const selected = await Selected.findAll();
        const selectedplayer = await selected.map(e => {
            let value = { TeamName: e.dataValues.TeamName, PlayerId: e.dataValues.PlayerId }
            return value;
        });
        const players = await [];
        for (i = 0; i < selectedplayer.length; i++) {
            let value = await Player.findOne({ where: { id: selectedplayer[i].PlayerId } })
            let value2 = await { TeamName: selectedplayer[i].TeamName, Player: value.name }
            players.push(value2)
        }
        res.json(players);
    } catch (error) {
        res.json("Error while fetching the selected players ")
    }
}

exports.assignPlayer = async (req, res, next) => {
    try {
        /*======================getting data from the user============================= */
        /*======================team to add ...... gender required============================= */
        const TeamId = await req.body.TeamId;
        const gender = await req.body.gender;

        /*=============================================================================*/
        /*==========================Checking wheather team has space for players===========*/

        const check = await Selected.findAll({ where: { TeamId: TeamId } });
        if (check.length > 6) throw error;

        const PlayerId = await check.map(e => e.PlayerId);
        const players = await [];
        for (i = 0; i < check.length; i++) {
            let value = await Player.findOne({ where: { id: PlayerId[i], captain: "No" } })
            players.push(value)
        }
        const is = await players[0];
        if (is != null) {
            const totalMaleInTeam = await players.filter(e => e.dataValues.gender == "M");
            const totalFemaleInTeam = await players.filter(e => e.dataValues.gender == "F");

            /*=============================================================================*/
            /*================adding the check for requested players==================*/

            if (gender === "M" && totalMaleInTeam.length == 5) throw error;

            if (gender === "F" && totalFemaleInTeam.length == 1) throw error;
        }
        /*=============================================================================*/
        /*=============to find the player that are not in teams================*/
        /*=============================================================================*/

        const a = await Selected.findAll();
        const allPlayers = await Player.findAll();
        const selectedPlayers = [];

        for (i = 0; i < a.length; i++) {
            let value = await Player.findOne({ where: { id: a[i].dataValues.PlayerId } });
            await selectedPlayers.push(value);
        }
        const c = await selectedPlayers.map(e => e.id);

        const notinTeam = await allPlayers.filter(e => {
            if (!c.includes(e.id)) {
                return e;
            }
        })

        if (notinTeam.length == 0) throw error;

        /*============selecting the male and female not in the teams players=============*/
        if (gender === "M") {
            const malePlayers = await notinTeam.filter(e => {
                return e.dataValues.gender == "M"
            });

            if (malePlayers.length == 0) throw error;

            const single = await getRandomItem(malePlayers);
            await Selected.create({
                TeamId: TeamId,
                PlayerId: single.id
            })
            res.json({ Player: "Player added is" })
        } else {
            const femalePlayers = await notinTeam.filter(e => {
                return e.dataValues.gender == "F"
            });

            if (femalePlayers.length == 0) throw error;

            const single = await getRandomItem(femalePlayers);
            await Selected.create({
                TeamId: TeamId,
                PlayerId: single.id
            })
            res.json({ Player: "Player added " })
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