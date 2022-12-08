const Player = require('../model/player')
const Team = require('../model/team')
const Allteams = require('../model/selected')

exports.getPlayer = async (req, res, next) => {
    const player = await Player.findAll()
    res.json(player);
}

// .... creating players .... //

exports.postPlayer = async (req, res, next) => {
    try {
        const name = await req.body.name;
        const gender = await req.body.gender;
        const captain = await req.body.captain;
        await Player.create({
            name: name,
            gender: gender,
            captain: captain
        });

        if (captain == "Yes") {

            const player = await Player.findOne({ where: { name: name } });

            const total = await Team.findAll();

            const no = await Object.keys(total).length + 1;

            await Team.create({
                teamName: `Team_${no}`
            })

            await Allteams.create({
                TeamName: `Team_${no}`,
                PlayerId: player.dataValues.id
            })
        }
        res.redirect('/')
    } catch (error) {
        console.log('Error in postPlayer', error)
        res.json('Error creating the user')
    }
}

// updating a player ......!

exports.updatePlayer = async (req, res, next) => {
    try {
        const id = await req.body.id;
        const name = await req.body.name;
        const gender = await req.body.gender;
        const captain = await req.body.captain;

        await Player.update({
            name: name,
            gender: gender,
            captain: captain
        }, {
            where: { id: id }
        })
        res.redirect('/')
    } catch (error) {
        console.log('Error updating the player', error)
        res.json("Error while updating the player")
    }
}

// deleting a player...!

exports.deletePlayer = async (req, res, next) => {
    try {
        const id = req.body.id;
        await Player.destroy({ where: { id: id } });
        res.redirect('/');
    } catch (error) {
        console.log('Error', error)
        res.json("Error while deleteing a player")
    }
}