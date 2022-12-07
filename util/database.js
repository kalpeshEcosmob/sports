const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodesql', 'kalpesh', 'kalpesh', {
    dialect: "mysql",
    host: "localhost"
})

module.exports = sequelize;
