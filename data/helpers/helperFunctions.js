require('dotenv').config();
const jwt = require('jsonwebtoken');
const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig.development);

const register = user => {
    return db('users').insert(user);
};

const loginStart = username => {
    return db('users')
        .where({ username })
        .first();
};

const generateToken = user => {
    const { secret } = process.env;

    const payload = {
        userId: user.id,
        firstName: user.firstName
    };

    const options = {
        expiresIn: '240m'
    };

    return jwt.sign(payload, secret, options);
};

const getUsers = () => {
    return db('users').select('id', 'username');
};

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
    restrictedByToken,
    clientsOnly,
    instructorsOnly
};
