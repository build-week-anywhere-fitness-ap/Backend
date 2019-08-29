exports.up = function(knex) {
    return knex.schema.table('classes', table => {
        table.dropColumn('dateTime');
    });
};

exports.down = function(knex) {
    return knex.schema.table('classes', table => {
        table.datetime('dateTime', { precision: 6 }).notNullable();
    });
};
