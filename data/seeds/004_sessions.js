exports.seed = function(knex) {
    // Deletes ALL existing entries
    knex.raw('SET foreign_key_checks = 0');
    return knex('sessions')
        .truncate()
        .then(function() {
            knex.raw('SET foreign_key_checks = 1');
            // Inserts seed entries
            return knex('sessions').insert([
                {
                    class_id: 1,
                    dateTime: '2019-08-30 16:30:00'
                },
                {
                    class_id: 2,
                    dateTime: '2019-08-30 18:00:00'
                },
                {
                    class_id: 3,
                    dateTime: '2019-08-31 16:30:00'
                }
            ]);
        });
};
