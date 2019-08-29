// ----------------- Imports ---------------- //
const express = require('express');
const config = require('./config/middlewareConfig');
const userRouter = require('./routes/userRouter');
const classesRouter = require('./routes/classesRouter');
const passesRouter = require('./routes/passesRouter');
const sessionsRouter = require('./routes/sessionsRouter');

const server = express();

// ------- Configuration & Middleware -------- //
config(server);

// ----------------- Routes ------------------ //
server.use('/api', userRouter);
server.use('/api', classesRouter);
server.use('/api', passesRouter);
server.use('/api', sessionsRouter);

// ---------------- Test Route --------------- //
server.get('/', async (req, res) => {
    try {
        res.status(200).send('Anywhere Fitness API running!');
    } catch (error) {
        res.status(500).json({ message: `Looks like the API is down...` });
    }
});

module.exports = server;
