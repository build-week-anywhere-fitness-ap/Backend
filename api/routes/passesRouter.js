require('dotenv').config();
const express = require('express');
const helper = require('../../data/helpers/helperFunctions');

const router = express.Router();

const { restrictedByToken, restrictedById, clientsOnly } = helper; // deconstructed middleware
const userRestriction = [restrictedByToken, clientsOnly]; // combines middleware

// ------------- Get All Passes ------------ //

router.get('/passes/', restrictedByToken, async (req, res) => {
    try {
        let passes = await helper.getPasses();

        res.status(200).json(passes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// ----------- Get Specific Pass ----------- //

router.get('/passes/:id', restrictedByToken, async (req, res) => {
    const { id } = req.params;

    try {
        let foundPass = await helper.getPassById(id);

        res.status(200).json(foundPass);
    } catch (error) {
        res.status(404).send(error);
    }
});

// ---------------- Add Pass --------------- //

router.post('/passes/', userRestriction, async (req, res) => {
    const passInfo = req.body;

    try {
        let newPass = await helper.addPass(passInfo);

        res.status(201).json(newPass);
    } catch (error) {
        res.status(500).send(error);
    }
});

// -------------- Update Pass -------------- //

router.put('/passes/:id', userRestriction, async (req, res) => {
    const { id } = req.params;
    const passInfo = req.body;

    try {
        let updatedPass = await helper.updatePass(id, passInfo);

        res.status(200).json(updatedPass);
    } catch (error) {
        res.status(404).send(error);
    }
});

// -------------- Delete Pass -------------- //

router.delete('/passes/:id', userRestriction, async (req, res) => {
    const { id } = req.params;

    try {
        let deletedPass = await helper.deletePass(id);

        res.status(200).json(deletedPass);
    } catch (error) {
        res.status(404).send(error);
    }
});

module.exports = router;
