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
module.exports = {
    register,
    loginStart,
    generateToken,
    getUsers
};
