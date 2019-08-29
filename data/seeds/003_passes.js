exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('passes')
        .del()
        .then(function() {
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
