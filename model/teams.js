const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Team = sequelize.define('team', {
    teamName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Team;