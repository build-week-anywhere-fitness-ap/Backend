require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const helper = require('../../data/helpers/helperFunctions');

const router = express.Router();

const { restrictedByToken, restrictedById } = helper; // deconstructed middleware

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

// --------------- Get Users --------------- //
router.get('/users/', restrictedByToken, async (req, res) => {
    try {
        let users = await helper.getUsers();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            error: `Couldn't retrieve any users at this time.`
        });
    }
});

// ------------ Get User By Id ------------- //
router.get('/users/:id', restrictedByToken, async (req, res) => {
    const { id } = req.params;
    try {
        let user = await helper.getUserById(id);
        if (user.length > 0) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                error: `Couldn't find any users with this id.`
            });
        }
    } catch (error) {
        res.status(500).json({
            error: `Couldn't retrieve any users at this time.`
        });
    }
});

// -------------- Update User -------------- //
router.put('/users/:id', restrictedById, async (req, res) => {
    const { id } = req.params;
    const info = req.body;
    try {
        let updatedUser = await helper.updateUser(id, info);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json({
            error: `Couldn't find any users with this id.`
        });
    }
});

// -------------- Delete User -------------- //
router.delete('/users/:id', restrictedById, async (req, res) => {
    const { id } = req.params;
    try {
        let deletedUser = await helper.deleteUser(id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(404).json({
            error: `Couldn't find any users with this id.`
        });
    }
});
module.exports = router;
