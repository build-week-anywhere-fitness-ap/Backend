require('dotenv').config();

const bcrypt = require('bcryptjs');

const { testUser1, testUser2, testUser3, testUser4 } = process.env;

exports.seed = function(knex, Promise) {
    // Resets ALL existing entries
    return knex('users')
        .truncate()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                {
                    firstName: 'Edelgard',
                    lastName: 'von Hresvelg',
                    username: 'blackeagles',
                    password: bcrypt.hashSync(`${testUser1}`, 16),
                    client: true
                },
                {
                    firstName: 'Dimitri',
                    lastName: 'Alexandre Blaiddyd',
                    username: 'bluelions',
                    password: bcrypt.hashSync(`${testUser2}`, 16),
                    client: true
                },
                {
                    firstName: 'Claude',
                    lastName: 'von Reigan',
                    username: 'goldendeer',
                    password: bcrypt.hashSync(`${testUser3}`, 16),
                    client: true
                },
                {
                    firstName: 'Byleth',
                    lastName: 'Eisner',
                    username: 'fishfearme',
                    password: bcrypt.hashSync(`${testUser4}`, 16),
                    instructor: true
                }
            ]);
        });
};
