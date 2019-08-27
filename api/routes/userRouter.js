require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const helper = require('../../data/helpers/helperFunctions');

const router = express.Router();

// -------------- Registration ------------- //
router.post('/register/', async (req, res) => {
    const userInfo = req.body;

    if (userInfo.password && userInfo.userName) {
        if (userInfo.firstName && userInfo.lastName) {
            userInfo.password = bcrypt.hashSync(userInfo.password, 15);
            try {
                const id = await helper.register(userInfo);
                res.status(201).json(id);
            } catch (err) {
                res.status(403).json({
                    error: `Couldn't register this user. User may already exist.`
                });
            } //  attempt to register
        } else {
            res.status(403).json({
                error: `Please include both first name and last name.`
            });
        } // 'did they include names?' check
    } else {
        res.status(403).json({
            error: `Please include a username and password.`
        });
    } // 'did they include a username and password?' check
});

// ----------------- Login ----------------- //
router.post('/login/', async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        try {
            let foundUser = await helper.loginStart(username);

            if (bcrypt.compareSync(password, foundUser.password)) {
                const token = helper.generateToken(foundUser);
                res.status(200).json({
                    id: foundUser.id,
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                    instructor: foundUser.instructor,
                    client: foundUser.client,
                    token: token
                });
            } else {
                res.status(401).json({
                    message: `Invalid username or password.`
                });
            } // 'does password match?' check
        } catch (error) {
            res.status(401).json({ message: `Invalid username or password.` });
        } // 'does user exist?' check
    } else {
        res.status(403).json({
            error: `Please include both username and password.`
        });
    } // 'does username & password exists?' check
});
module.exports = router;
