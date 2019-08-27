exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments();
        table.string('firstName', 128).notNullable();
        table.string('lastName', 128).notNullable();
        table
            .string('username', 128)
            .unique('uq_users_username')
            .notNullable();
        table.string('password', 255).notNullable();
        table.boolean('instructor').defaultTo(false);
        table.boolean('client').defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
