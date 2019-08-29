exports.seed = function(knex) {
    // Deletes ALL existing entries
    knex.raw('SET foreign_key_checks = 0');
    return knex('passes')
        .truncate()
        .then(function() {
            knex.raw('SET foreign_key_checks = 1');
            // Inserts seed entries
            return knex('passes').insert([
                {
                    client_id: 2,
                    class_id: 2,
                    timesUsed: 0,
                    completed: false
                },
                {
                    client_id: 1,
                    class_id: 1,
                    timesUsed: 3,
                    completed: false
                },
                {
                    client_id: 3,
                    class_id: 3,
                    timesUsed: 9,
                    completed: false
                }
            ]);
        });
};
