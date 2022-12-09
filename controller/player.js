const Player = require('../model/player')
const Team = require('../model/team')
const Selected = require('../model/selected')

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
        const createdPlayer = await Player.create({
            name: name,
            gender: gender,
            captain: captain
        });

        if (captain == "Yes") {

            const player = await Player.findOne({ where: { id: createdPlayer.dataValues.id } });

            const total = await Team.findAll();
            if (total.length > 0) {
                const arr = await total.map(e => e.dataValues.teamName);
                const number = await [];
                for (i = 0; i < arr.length; i++) {
                    let num = await arr[i].split('_')[1];
                    let num1 = await Number(num);
                    number.push(num1)
                }
                const requiredNo = await largest(number) + 1;

                const createdTeam = await Team.create({
                    teamName: `Team_${requiredNo}`,
                    points: 0
                })

                await Selected.create({
                    TeamId: createdTeam.dataValues.id,
                    PlayerId: player.dataValues.id
                })
                res.redirect('/')
            } else {
                const requiredNo = await 1;
                const createdTeam = await Team.create({
                    teamName: `Team_${requiredNo}`,
                    points: 0
                })

                await Selected.create({
                    TeamId: createdTeam.dataValues.id,
                    PlayerId: player.dataValues.id
                })
                res.redirect('/')
            }
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
        const PlayerId = await req.body.PlayerId;
        const toDelete = await Player.findOne({ where: { id: PlayerId } });
        const toDeleteId = await toDelete.dataValues.id;
        await Player.destroy({ where: { id: toDeleteId } });
        await Selected.destroy({ where: { PlayerId: toDeleteId } });
        res.redirect('/');
    } catch (error) {
        console.log('Error', error)
        res.json("Error while deleteing a player")
    }
}

function largest(arr) {
    let i;
    let max = arr[0];
    for (i = 1; i < arr.length; i++) {
        if (arr[i] > max)
            max = arr[i];
    }
    return max;
}