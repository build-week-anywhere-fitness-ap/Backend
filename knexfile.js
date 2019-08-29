const localPg = {
    host: 'localhost',
    database: 'notinuse',
    user: 'notinuse',
    password: 'notinuse'
};
const productionPg = process.env.DATABASE_URL || localPg;
// Update with your config settings.

module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './data/fitness.sqlite3'
        },
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds'
        },
        useNullAsDefault: true
    },
    production: {
        client: 'pg',
        connection: productionPg,
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds'
        }
    }
};
