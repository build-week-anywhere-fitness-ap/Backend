exports.seed = function(knex) {
    // Deletes ALL existing entries
    knex.raw('SET foreign_key_checks = 0');
    return knex('classes')
        .truncate()
        .then(function() {
            knex.raw('SET foreign_key_checks = 1');
            return knex('classes').insert([
                {
                    name: 'Axe Practice',
                    type: 'High Intensity',
                    location: 'Garreg Mach Monastery',
                    instructor_id: 4
                },
                {
                    name: 'Riding Practice',
                    type: 'High Intensity',
                    location: 'Garreg Mach Monastery',
                    instructor_id: 4
                },
                {
                    name: 'Archery',
                    type: 'High Intensity',
                    location: 'Garreg Mach Monastery',
                    instructor_id: 4
                }
            ]);
        });
};
