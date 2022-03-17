var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config');
const db = require("../model/helper");


// Register a user with POST 

router.post('/user/register', async (req, res) => {
    let {username, password, email} = req.body;
    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    try {
        let sql = `
        INSERT INTO users (username, password, email)
        VALUES ('${username}', '${hashedPassword}', '${email}')
        `;
        await db(sql);
        res.send({message: 'Registration successful'});
    } catch (err) {
        res.status(500).send({error: err.message});
    }
});

// Login a user with POST

router.post('/user/login', async (req, res) => {
    let {username, password} = req.body;

    try {
        let results = await db(`SELECT * FROM users WHERE username = '${username}'`)
        if (results.data.length === 0) {
            res.status(401).send({error: 'Login failed'});
        } else {
            let user = results.data[0];
            let passwordsEqual = await bcrypt.compare(password, user.password);
            if (passwordsEqual) {
                let payload = {userid: user.userid};
                let token = jwt.sign(payload, SECRET_KEY);
                delete user.password;
                res.send({
                    message: 'Login successful',
                    token: token,
                    user: user
                });
            } else {
                res.status(401).send({error: 'Login failed'});
            }
        }
    } catch (err) {
        res.status(500).send({error: err.message});
    }
});

module.exports = router;