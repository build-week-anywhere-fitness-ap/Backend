require('dotenv').config();
const jwt = require('jsonwebtoken');
const knex = require('knex');
const knexConfig = require('../../knexfile');
const dbEnv = process.env.dbConfig || 'development';

const db = knex(knexConfig[dbEnv]);

// ---------------- General ---------------- //

const getFromDatabase = tableToUse => {
    if (tableToUse === 'users') {
        return db('users').select(
            'id',
            'username',
            'firstName',
            'lastName',
            'client',
            'instructor'
        );
    } else {
        return db(tableToUse).select();
    }
};

const getFromDbById = (tableToUse, id) => {
    return db(tableToUse)
        .where({ id })
        .select();
};

const addToDatabase = (tableToUse, item) => {
    return db(tableToUse)
        .insert(item)
        .returning('id');
};

const updateDatabase = (tableToUse, id, itemInfo) => {
    return db(tableToUse)
        .where({ id })
        .first()
        .update(itemInfo);
};

const deleteFromDatabase = (tableToUse, id) => {
    return db(tableToUse)
        .where({ id })
        .first()
        .del();
};
// ----------------- Users ----------------- //

const loginStart = username => {
    return db('users')
        .where({ username })
        .first();
};

const getUserById = async id => {
    const user = db('users')
        .where({ id })
        .select(
            'id',
            'username',
            'firstName',
            'lastName',
            'client',
            'instructor'
        );

    const classes = db('classes')
        .where({ instructor_id: id })
        .select('id', 'name', 'type', 'location');

    const passes = db('passes')
        .where({ client_id: id })
        .select('id', 'class_id', 'timesUsed', 'completed');

    let result = await Promise.all([user, classes, passes]);

    return {
        ...result[0][0],
        classes: result[1],
        passes: result[2]
    };
};

// --------------- Classes ----------------- //

const getClassById = async id => {
    const foundClass = db('classes')
        .where({ id })
        .first();

    const sessions = db('sessions')
        .where({ class_id: id })
        .select('id', 'dateTime');

    let result = await Promise.all([foundClass, sessions]);

    return { ...result[0], sessions: result[1] };
};

const getClassesByUser = id => {
    return db('classes')
        .where({ instructor_id: id })
        .select('id', 'name', 'type', 'location', 'instructor_id');
};

// ---------------- Passes ----------------- //

const getPassesByClient = client_id => {
    return db('passes')
        .where({ client_id })
        .select('id', 'client_id', 'class_id', 'timesUsed', 'completed');
};

// -------------- Sessions ----------------- //

const getSessionsByClass = class_id => {
    return db('sessions')
        .where({ class_id })
        .select('id', 'class_id', 'dateTime');
};

// --------------- Tokens ------------------ //

const generateToken = user => {
    const { secret } = process.env;

    const payload = {
        id: user.id,
        instructor: user.instructor,
        client: user.client
    };

    const options = {
        expiresIn: '240m'
    };

    return jwt.sign(payload, secret, options);
};

// ------------ Restrictions --------------- //

const restrictedByToken = (req, res, next) => {
    const token = req.headers.authorization;
    const { secret } = process.env;

    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                res.status(401).json({
                    message: `Invalid token!`
                });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        }); // end jwt.verify
    } else {
        res.status(401).json({
            error: `No token found!`
        });
    }
};

const restrictedById = (req, res, next) => {
    const token = req.headers.authorization;
    const { secret } = process.env;

    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (decodedToken.id.toString() === req.params.id.toString()) {
                req.decodedToken = decodedToken;
                next();
            } else {
                res.status(401).json({
                    message: `This user isn't authorized to take this action!`
                });
            }
        }); // end jwt.verify
    } else {
        res.status(401).json({
            error: `No token found!`
        });
    }
};

const clientsOnly = (req, res, next) => {
    const token = req.headers.authorization;
    const { secret } = process.env;

    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (decodedToken.client) {
                req.decodedToken = decodedToken;
                next();
            } else {
                res.status(401).json({
                    message: `This user isn't authorized to take this action!`
                });
            }
        }); // end jwt.verify
    } else {
        res.status(401).json({
            error: `No token found!`
        });
    }
};

const instructorsOnly = (req, res, next) => {
    const token = req.headers.authorization;
    const { secret } = process.env;

    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (decodedToken.instructor) {
                req.decodedToken = decodedToken;
                next();
            } else {
                res.status(401).json({
                    message: `This user isn't authorized to take this action!`
                });
            }
        }); // end jwt.verify
    } else {
        res.status(401).json({
            error: `No token found!`
        });
    }
};

module.exports = {
    getFromDatabase,
    getFromDbById,
    addToDatabase,
    updateDatabase,
    deleteFromDatabase,
    loginStart,
    generateToken,
    getUserById,
    getClassById,
    getClassesByUser,
    getPassesByClient,
    getSessionsByClass,
    restrictedByToken,
    restrictedById,
    clientsOnly,
    instructorsOnly
};
