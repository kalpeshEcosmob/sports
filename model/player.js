const Sequelize = require('sequelize');

const sequelize = require('../util/database')

const Player = sequelize.define('player', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    inTeam: {
        type: Sequelize.STRING,
        allowNull: false
    },
    captain: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Player;