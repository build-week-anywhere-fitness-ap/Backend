exports.up = function(knex) {
    return knex.schema.createTable('sessions', table => {
        table.increments();
        table
            .integer('class_id')
            .unsigned()
            .references('classes.id')
            .notNullable();
        table.datetime('dateTime', { precision: 6 }).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('sessions');
};
