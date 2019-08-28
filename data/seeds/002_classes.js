exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('classes')
        .truncate()
        .then(function() {
            // Inserts seed entries
            return knex('classes').insert([
                {
                    name: 'Axe Practice',
                    type: 'High Intensity',
                    location: 'Garreg Mach Monastery',
                    instructor_id: 4,
                    dateTime: '2019-08-30 16:30:00'
                },
                {
                    name: 'Riding Practice',
                    type: 'High Intensity',
                    location: 'Garreg Mach Monastery',
                    instructor_id: 4,
                    dateTime: '2019-08-30 18:00:00'
                },
                {
                    name: 'Archery',
                    type: 'High Intensity',
                    location: 'Garreg Mach Monastery',
                    instructor_id: 4,
                    dateTime: '2019-08-31 16:30:00'
                }
            ]);
        });
};
