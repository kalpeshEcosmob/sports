require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./util/database')
const bodyParser = require('body-parser');
const playerRoutes = require('./routes/player');
const userRoutes = require('./routes/user');
const teamRoutes = require('./routes/team');

app.use(express.json());
app.use(bodyParser.json());

app.use(userRoutes)
app.use(playerRoutes)
app.use(teamRoutes)

sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Connected at port 3000')
        })
    })
    .catch(err => {
        console.log('Error', err)
    })

