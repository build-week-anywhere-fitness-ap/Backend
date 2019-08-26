const express = require('express');
// const config = require('./config/middlewareConfig');

const server = express();
// config(server);

server.get('/', async (req, res) => {
    try {
        res.status(200).send('Anywhere Fitness API running!');
    } catch (error) {
        res.status(500).json({ message: `Looks like the API is down...` });
    }
});

module.exports = server;
