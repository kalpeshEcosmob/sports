const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Selected = sequelize.define('selected', {
    TeamId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    PlayerId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Selected;