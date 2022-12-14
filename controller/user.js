const User = require('../model/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.postLogin = async (req, res, next) => {
    try {
        const email = await req.body.email;
        const name = await req.body.name;
        const password = await req.body.password;
        const loggedUser = await User.findOne({ where: { email: email } });
        const value = await Object.keys(loggedUser).length === 0;
        if (value) throw error;
        const sqlPassword = await loggedUser.dataValues.password;
        const isUser = await bcrypt.compare(password, sqlPassword);
        if (!isUser) throw error;
        const token = await jwt.sign({ name: name }, process.env.SECRET_KEY);
        res.json({ email: email, userName: loggedUser.dataValues.userName, token: token })
    } catch (error) {
        console.log('error', error)
        res.status(404).json('Username or password is incorrect')
    }
}

exports.postSignin = async (req, res, next) => {
    try {
        const email = await req.body.email;
        const name = await req.body.name;
        const password = await req.body.password;
        const hashed = await bcrypt.hash(password, 12);
        await User.create({
            email: email,
            userName: name,
            password: hashed
        });
        res.json("Added....!")
    } catch (error) {
        console.log('err', error)
        res.status(404).json("Error signing the customer")
    }
}
