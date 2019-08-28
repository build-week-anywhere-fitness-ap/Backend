exports.up = function(knex) {
    return knex.schema.createTable('passes', table => {
        table.increments();
        table
            .integer('client_id')
            .unsigned()
            .references('users.id')
            .notNullable();
        table
            .integer('class_id')
            .unsigned()
            .references('classes.id')
            .notNullable();
        table.integer('timesUsed').defaultsTo(0);
        table.boolean('completed').defaultsTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('passes');
};
