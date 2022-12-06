const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodesql', 'kalpesh', 'kalpesh', {
    dialect: "mysql",
    host: "localhost"
})

module.exports = sequelize;

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'kalpesh',
//     password: "kalpesh",
//     database:"nodesql"
// });

// module.exports = pool.promise();