require('dotenv').config();
const express = require('express');
const helper = require('../../data/helpers/helperFunctions');

const router = express.Router();

const { restrictedByToken, instructorsOnly } = helper;
const userRestriction = [restrictedByToken, instructorsOnly];

// ------------ Get All Sessions ------------ //

router.get('/sessions/', restrictedByToken, async (req, res) => {
    try {
        let sessions = await helper.getSessions();

        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).send(error);
    }
});

// --------- Get Specific Session ----------- //

router.get('/sessions/:id', restrictedByToken, async (req, res) => {
    const { id } = req.params;
    try {
        let foundSession = await helper.getSessionById(id);

        res.status(200).json(foundSession);
    } catch (error) {
        res.status(500).send(error);
    }
});

// --------------- Add Session -------------- //

router.post('/sessions/', userRestriction, async (req, res) => {
    const sessionInfo = req.body;

    try {
        let newSession = await helper.addSession(sessionInfo);

        res.status(201).json(newSession);
    } catch (error) {
        res.status(500).send(error);
    }
});

// ------------- Update Session ------------- //

router.put('/sessions/:id', userRestriction, async (req, res) => {
    const sessionInfo = req.body;
    const { id } = req.params;

    try {
        let updatedSession = await helper.updateSession(id, sessionInfo);

        res.status(200).json(updatedSession);
    } catch (error) {
        res.status(404).send(error);
    }
});

// ------------- Delete Session ------------- //

router.delete('/sessions/:id', userRestriction, async (req, res) => {
    const { id } = req.params;

    try {
        let deletedSession = await helper.deleteSession(id);

        res.status(200).json(deletedSession);
    } catch (error) {
        res.status(404).send(error);
    }
});
module.exports = router;
