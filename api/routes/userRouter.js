require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const helper = require('../../data/helpers/helperFunctions');

const router = express.Router();

// -------------- Registration ------------- //
router.post('/register/', async (req, res) => {
    const userInfo = req.body;

    if (userInfo.password) {
        if (userInfo.username) {
            if (userInfo.firstName && userInfo.lastName) {
                userInfo.password = bcrypt.hashSync(userInfo.password, 16);
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
                error: `Please include a password.`
            });
        } // 'did they include a username?' check
    } else {
        res.status(403).json({
            error: `Please include a username.`
        });
    } // 'did they include a username and password?' check
});

// ----------------- Login ----------------- //
router.post('/login/', async (req, res) => {
    const { username, password } = req.body;

    if (username) {
        if (password) {
            try {
                let response = await helper.loginStart(username);

                if (bcrypt.compareSync(password, response.password)) {
                    const token = helper.generateToken(response);
                    res.status(200).json({
                        id: response.id,
                        firstName: response.firstName,
                        lastName: response.lastName,
                        instructor: response.instructor,
                        client: response.client,
                        token: token
                    });
                } else {
                    res.status(401).json({
                        message: `Invalid username or password.`
                    });
                } // 'does password match?' check
            } catch (error) {
                res.status(401).json({
                    message: `Invalid credentials.`
                });
            } // 'does user exist?' check
        } else {
            res.status(403).json({
                error: `Please include a password.`
            });
        } // 'does password exists?' check
    } else {
        res.status(403).json({
            error: `Please include a username.`
        });
    } // 'does username exists?' check
});

router.get('/users/', async (req, res) => {
    try {
        let users = await helper.getUsers();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            error: `Couldn't retrieve users at this time.`
        });
    }
});
module.exports = router;
