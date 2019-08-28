exports.up = function(knex) {
    return knex.schema.createTable('classes', table => {
        table.increments();
        table.string('name', 255).notNullable();
        table.string('type', 128);
        table.string('location', 255).notNullable();
        table
            .integer('instructor_id')
            .unsigned()
            .references('users.id');
        table.datetime('dateTime', { precision: 6 }).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('classes');
};
