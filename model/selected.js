const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Selected = sequelize.define('selected', {
    TeamName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    PlayerId: {
        type: Sequelize.NUMBER,
        allowNull: false
    }
});

module.exports = Selected;