const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Selected = sequelize.define('selected', {
    TeamId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    PlayerId: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Selected;