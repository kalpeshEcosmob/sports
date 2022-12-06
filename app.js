const express = require('express');
const app = express();
const sequelize = require('./util/database')
const bodyParser = require('body-parser');
const playerRoutes = require('./routes/player');

app.use(express.json());
app.use(bodyParser.json());
app.use(playerRoutes)

sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Connected at port 3000')
        })
    })
    .catch(err => {
        console.log('Error', err)
    })

