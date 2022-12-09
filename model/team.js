const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Team = sequelize.define('team', {
    teamName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    points: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Team;