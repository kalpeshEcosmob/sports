const Sequelize = require('sequelize');

const sequelize = require('../util/database')

const Match = sequelize.define('match', {
    team1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    team2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    winner: {
        type: Sequelize.STRING,
        allowNull: false
    },
    scheduled: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

module.exports = Match;