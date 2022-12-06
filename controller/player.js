const Player = require('../model/player')
const Team = require('../model/teams')

exports.getPlayer = async (req, res, next) => {
    // const player = await Player.findAll()
    // res.json(player);

    const team = await Team.findAll()
    res.json(team);
}

// .... creating players .... //

exports.postPlayer = async (req, res, next) => {
    try {
        const name = await req.body.name;
        const gender = await req.body.gender;
        const inTeam = await "No";
        const captain = await req.body.captain;
        const createdPlayer = await Player.create({
            name: name,
            gender: gender,
            inTeam: inTeam,
            captain: captain
        });
        if (captain == "Yes") {
            const newTeam = await Team.create({
                teamName: "newTeam"
            })
        }
        res.redirect('/')
    } catch (error) {
        res.json('Error', error)
    }
}