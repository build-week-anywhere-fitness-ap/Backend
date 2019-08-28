require('dotenv').config();
const jwt = require('jsonwebtoken');
const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig.development);

// ----------------- Users ----------------- //

const register = user => {
    return db('users').insert(user);
};

const loginStart = username => {
    return db('users')
        .where({ username })
        .first();
};

const getUsers = () => {
    return db('users').select(
        'id',
        'username',
        'firstName',
        'lastName',
        'client',
        'instructor'
    );
};

const getUserById = id => {
    return db('users')
        .where({ id })
        .select(
            'id',
            'username',
            'firstName',
            'lastName',
            'client',
            'instructor'
        );
};

const updateUser = (id, data) => {
    return db('users')
        .where({ id })
        .first()
        .update(data);
};

const deleteUser = id => {
    return db('users')
        .where({ id })
        .first()
        .del();
};

// --------------- Classes ----------------- //

const getClasses = () => {
    return db('classes').select(
        'id',
        'name',
        'type',
        'location',
        'instructor_id',
        'dateTime'
    );
};

const getClassById = id => {
    return db('classes')
        .where({ id })
        .first()
        .select('id', 'name', 'type', 'location', 'instructor_id', 'dateTime');
};

const getClassesByUser = id => {
    return db('classes')
        .where({ instructor_id: id })
        .select('id', 'name', 'type', 'location', 'instructor_id', 'dateTime');
};

const addClass = classInfo => {
    return db('classes').insert(classInfo);
};

const updateClass = (id, classInfo) => {
    return db('classes')
        .where({ id })
        .first()
        .update(classInfo);
};

const deleteClass = id => {
    return db('classes')
        .where({ id })
        .first()
        .del();
};

// ---------------- Passes ----------------- //

const getPasses = () => {
    return db('passes').select(
        'id',
        'client_id',
        'class_id',
        'timesUsed',
        'completed'
    );
};

const getPassById = id => {
    return db('passes')
        .where({ id })
        .first()
        .select('id', 'client_id', 'class_id', 'timesUsed', 'completed');
};

const getPassesByClient = client_id => {
    return db('passes')
        .where({ client_id })
        .select('id', 'client_id', 'class_id', 'timesUsed', 'completed');
};

const addPass = info => {
    return db('passes').insert(info);
};

const updatePass = (id, info) => {
    return db('passes')
        .where({ id })
        .first()
        .update(info);
};

const deletePass = id => {
    return db('passes')
        .where({ id })
        .first()
        .del();
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
    register,
    loginStart,
    generateToken,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getClasses,
    getClassById,
    getClassesByUser,
    addClass,
    updateClass,
    deleteClass,
    getPasses,
    getPassById,
    getPassesByClient,
    addPass,
    updatePass,
    deletePass,
    restrictedByToken,
    restrictedById,
    clientsOnly,
    instructorsOnly
};
