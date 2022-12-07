const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getauth = async (req, res, next) => {
    try {
        const token = await req.header('token');
        await jwt.verify(token, process.env.SECRET_KEY)
        next();
    } catch (error) {
        console.log('Error while authenticating ', error)
        res.json("Un-authorized")
    }
}